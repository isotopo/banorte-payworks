'use strict'

const assert = require('assert')
const co = require('co')
const joi = require('joi')
const PromiseEmitter = require('../utils/promiseEmitter')
const request = require('../utils').request
const validate = require('../utils').validate

/**
 * This is a description
 *
 * @public
 *
 * @param {Object} params
 * @param {(Object|Function|undefined)} options
 * @param {(Function|undefined)} callback
 *
 * @return {EventEmitter}
 */
module.exports = function preAuth (params, options, callback) {
  let e = {}
  assert(params)
  assert(params instanceof Object)
  if (typeof options === 'function') callback = options
  callback = callback || function noop () {}
  e = new PromiseEmitter((resolve, reject) => {
    co.call(this, function * () {
      params = yield validate(params, {
        amount: joi.number().required(),
        reference: joi.string(),
        entry_mode: joi.string().max(20).required(),
        card_number: joi.string().max(20).required(),
        card_exp: joi.string().max(4).required(),
        security_code: joi.string().max(4).required()
      })
      params.cmd_trans = 'PREAUTH'
      return yield request(Object.assign(this.default, params))
    })
    .then(function (res) {
      res.headers.codigo_payw && (e.emit(res.headers.codigo_payw, res.headers))
      res.headers.resultado_payw === 'A' && (e.emit('approved', res.headers))
      res.headers.resultado_payw === 'D' && (e.emit('declined', res.headers))
      res.headers.resultado_payw === 'R' && (e.emit('rejected', res.headers))
      res.headers.resultado_payw === 'T' && (e.emit('notAnswer', res.headers))
      setImmediate(() => {
        callback(null, res.headers, res)
      })
      resolve(res.headers)
    })
    .catch(function (err) {
      setImmediate(() => {
        callback(err, null, null)
      })
      reject(err)
      e.emit('error', err)
    })
  })
  return e
}
