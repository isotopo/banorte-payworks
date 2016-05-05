'use strict'

const assert = require('assert')
const co = require('co')
const EventEmitter = require('events')
const request = require('./utils').request
const validate = require('./utils').validate
const joi = require('joi')

class Payworks extends EventEmitter {
  constructor (options) {
    super()

    options = options || {}

    this.username = options.username
    this.password = options.password
    this.merchant = options.merchant
    this.terminal = options.terminal
  }

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
  auth (params, options, callback) {}

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
  forceAuth (params, options, callback) {}

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
  preAuth (params, options, callback) {
    assert(params)
    assert(params instanceof Object)

    if (typeof options === 'function') callback = options
    callback = callback || function noop () {}

    let e = new EventEmitter()

    co(function * () {
      yield validate(params, {
        amount: joi.number().required(),
        reference: joi.number().required()
      })

      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
    .then(function (res) {
      callback(null, res)
    })
    .catch(function (err) {
      callback.apply(this, arguments)
      e.emit('error', err)
    })

    return e
  }

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
  postAuth (params, options, callback) {}

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
  reAuth (params, options, callback) {}

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
  refund (params, options, callback) {}

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
  cancel (params, options, callback) {}

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
  reverse (params, options, callback) {}

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
  close (params, options, callback) {}

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
  closeGroup (params, options, callback) {}

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
  verify (params, options, callback) {}

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
  suspend (params, options, callback) {}

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
  reactivate (params, options, callback) {}
}

module.exports = Payworks
