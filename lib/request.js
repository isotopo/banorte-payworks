'use strict'

const assert = require('assert')
const co = require('co')
const request = require('./utils').request
const validate = require('./utils').validate

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @param {string} options
 * @param {string} options.eventPrefixName
 * @param {string} options.transactionName
 * @param {Object} schema
 * @param {Object} params
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
module.exports = function (options, schema, params, callback) {
  assert(params)
  assert(params instanceof Object)
  assert(schema)
  assert(schema instanceof Object)

  callback = typeof callback === 'function' ? callback : function noop () {}

  return new Promise((resolve, reject) => {
    co.call(this, function * () {
      params = yield validate(params, schema)
      params.cmd_trans = options.transactionName
      return yield request(Object.assign(this.default, params))
    })
    .then((res) => {
      let code = res.headers.codigo_payw
      let result = res.headers.resultado_payw
      code && (this.emit(code, res.headers))

      if (/^(D|R|T)$/i.test(result)) {
        setImmediate(callback, res.headers, null, res)
        result === 'D' && (this.emit(`${options.eventPrefixName}.declined`, res.headers))
        result === 'R' && (this.emit(`${options.eventPrefixName}.rejected`, res.headers))
        result === 'T' && (this.emit(`${options.eventPrefixName}.notAnswer`, res.headers))
      } else {
        setImmediate(callback, null, res.headers, res)
        result === 'A' && (this.emit(`${options.eventPrefixName}.approved`, res.headers))
      }

      resolve(res.headers)
    })
    .catch((err) => {
      setImmediate(callback, err, null, null)
      reject(err)
      this.emit(`${options.eventPrefixName}.error`, err)
    })
  })
}
