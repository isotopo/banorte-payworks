'use strict'

const assert = require('assert')
const co = require('co')
const request = require('./utils').request
const validate = require('./utils').validate
const PromiseEmitter = require('./utils/promiseEmitter')

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @param {Object} schema
 * @param {Object} params
 * @param {(Object|function|undefined)} options
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
module.exports = function (schema, params, options, callback) {
  assert(params)
  assert(params instanceof Object)
  assert(schema)
  assert(schema instanceof Object)

  if (typeof options === 'function') callback = options
  callback = callback || function noop () {}

  let e = new PromiseEmitter((resolve, reject) => {
    co.call(this, function * () {
      params = yield validate(params, schema)
      params.cmd_trans = 'PREAUTH'
      return yield request(Object.assign(this.default, params))
    })
    .then(function (res) {
      let code = res.headers.codigo_payw
      let result = res.headers.resultado_payw

      code && (e.emit(code, res.headers))

      if (/^(D|R|T)$/i.test(result)) {
        setImmediate(callback(res.headers, null, res))
        result === 'D' && (e.emit('declined', res.headers))
        result === 'R' && (e.emit('rejected', res.headers))
        result === 'T' && (e.emit('notAnswer', res.headers))
      } else {
        setImmediate(callback(null, res.headers, res))
        result === 'A' && (e.emit('approved', res.headers))
      }

      resolve(res.headers)
    })
    .catch(function (err) {
      setImmediate(callback(err, null, null))
      reject(err)
      e.emit('error', err)
    })
  })
  return e
}
