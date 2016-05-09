'use strict'

const EventEmitter = require('events')
const joi = require('joi')

/**
 * @class
 *
 * @param {Object} options
 */
class Payworks extends EventEmitter {
  constructor (options) {
    super()
    options = options || {}
    this.user = options.user
    this.password = options.password
    this.merchant_id = options.merchant
    this.terminal_id = options.terminal
    this.default = {}
    this.user && (this.default.user = this.user)
    this.password && (this.default.password = this.password)
    this.merchant_id && (this.default.merchant_id = this.merchant_id)
    this.terminal_id && (this.default.terminal_id = this.terminal_id)
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
  auth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'AUTH', schema, params, options, callback)
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
  forceAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'FORCED_AUTH', schema, params, options, callback)
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
  preAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    return Payworks.request.call(this, 'PREAUTH', schema, params, options, callback)
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
  postAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'POSTAUTH', schema, params, options, callback)
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
  reAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'REAUTH', schema, params, options, callback)
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
  refund (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'REFUND', schema, params, options, callback)
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
  cancel (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'VOID', schema, params, options, callback)
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
  reverse (params, options, callback) {
    let schema = {
      reference: joi.string().required(),
      control_number: joi.string().max(30)
    }

    return Payworks.request.call(this, 'REVERSAL', schema, params, options, callback)
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
  close (params, options, callback) {
    let schema = {}

    return Payworks.request.call(this, 'MCHNT_SETTLEMENT', schema, params, options, callback)
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
  closeGroup (params, options, callback) {
    let schema = {
      group: joi.string().required()
    }

    return Payworks.request.call(this, 'GROUP_SETTLEMENT', schema, params, options, callback)
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
  verify (params, options, callback) {
    let schema = {
      reference: joi.string(),
      control_number: joi.string()
    }

    return Payworks.request.call(this, 'VERIFY', schema, params, options, callback)
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
  suspend (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'LOCK', schema, params, options, callback)
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
  reactivate (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    return Payworks.request.call(this, 'UNLOCK', schema, params, options, callback)
  }
}

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @static
 * @method Payworks#request
 *
 * @param {Object} schema
 * @param {Object} params
 * @param {(Object|function|undefined)} options
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
Payworks.request = require('./request')

module.exports = Payworks
