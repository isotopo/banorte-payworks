'use strict'

const assert = require('assert')
const co = require('co')
const request = require('./utils').request
const validate = require('./utils').validate

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @param {string} transaction
 * @param {Object} schema
 * @param {Object} params
 * @param {(Object|function|undefined)} options
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
module.exports = function (transaction, schema, params, options, callback) {
  assert(params)
  assert(params instanceof Object)
  assert(schema)
  assert(schema instanceof Object)

  if (typeof options === 'function') callback = options
  options = {}
  callback = callback || function noop () {}
  var self = this
  console.log('callback')
  return new Promise((resolve, reject) => {
    co.call(this, function * () {
      params = yield validate(params, schema)
      params.cmd_trans = transaction
      return yield request(Object.assign(this.default, params))
    })
    .then(function (res) {
      let code = res.headers.codigo_payw
      let result = res.headers.resultado_payw
      code && (self.emit(code, res.headers))

      if (/^(D|R|T)$/i.test(result)) {
        console.log('antes del callback')
        setImmediate(callback, res.headers, null, res)
        console.log('despues del callback')
        result === 'D' && (self.emit('declined', res.headers))
        result === 'R' && (self.emit('rejected', res.headers))
        result === 'T' && (self.emit('notAnswer', res.headers))
      } else {
        console.log('antes del callback')
        setImmediate(callback, null, res.headers, res)
        console.log('despues del callback')

        result === 'A' && (self.emit('approved', res.headers))
      }

      resolve(res.headers)
    })
    .catch(function (err) {
      setImmediate(callback, err, null, null)
      reject(err)
      self.emit('error', err)
    })
  })
}
