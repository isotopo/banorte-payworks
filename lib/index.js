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
   * Request for an authorization
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {string} params.mode - Payworks Mode
   * @param {string} params.customer_ref1 - Payment customer reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  auth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required(),
            mode: joi.string(),
            customer_ref1: joi.string()
    }

    let requestOptions = {
      eventPrefixName: 'auth',
      transactionName: 'AUTH'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a force authorization
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {string} params.mode - Payworks Mode
   * @param {string} params.customer_ref1 - Payment customer reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  forceAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required(),
            mode: joi.string(),
            customer_ref1: joi.string()
    }

    let requestOptions = {
      eventPrefixName: 'forceAuth',
      transactionName: 'FORCED_AUTH'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a preauthorization
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {string} params.mode - Payworks Mode
   * @param {string} params.customer_ref1 - Payment customer reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  preAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required(),
            mode: joi.string(),
            customer_ref1: joi.string()
    }

    let requestOptions = {
      eventPrefixName: 'preAuth',
      transactionName: 'PREAUTH'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a postauthorization
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  postAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'postAuth',
      transactionName: 'POSTAUTH'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a reauthorization
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  reAuth (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'reAuth',
      transactionName: 'REAUTH'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a refund
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  refund (params, options, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'refund',
      transactionName: 'REFUND'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a cancellation
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  cancel (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'cancel',
      transactionName: 'VOID'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a reverse
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  reverse (params, options, callback) {
    let schema = {
      reference: joi.string().required(),
      control_number: joi.string().max(30)
    }

    let requestOptions = {
      eventPrefixName: 'reverse',
      transactionName: 'REVERSAL'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for closing a transaction
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  close (params, options, callback) {
    let schema = {}

    let requestOptions = {
      eventPrefixName: 'close',
      transactionName: 'MCHNT_SETTLEMENT'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for closing a transaction group
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.group - Group
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  closeGroup (params, options, callback) {
    let schema = {
      group: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'closeGroup',
      transactionName: 'GROUP_SETTLEMENT'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for a transaction verification
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  verify (params, options, callback) {
    let schema = {
      reference: joi.string(),
      control_number: joi.string()
    }

    let requestOptions = {
      eventPrefixName: 'verify',
      transactionName: 'VERIFY'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for suspend a transaction
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  suspend (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'suspend',
      transactionName: 'LOCK'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }

  /**
   * Request for reactivate a transaction
   *
   * @public
   *
   * @param {Object} params - Request Params
   * @param {string} params.reference - Reference
   * @param {(Object|undefined)} options - Extra options
   * @param {(string|undefined)} options.user - User
   * @param {(string|undefined)} options.password - Password
   * @param {(string|undefined)} options.merchant - Merchant ID
   * @param {(string|undefined)} options.terminal - Terminal ID
   * @param {(Function|undefined)} callback
   *
   * @return {Promise}
   */
  reactivate (params, options, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let requestOptions = {
      eventPrefixName: 'reactivate',
      transactionName: 'UNLOCK'
    }

    return Payworks.request.call(this, requestOptions, schema, params, options, callback)
  }
}

/**
 * Helper function to make request to Payworks. Works with coroutines or events and promises.
 * Supports schema validation and emits events depending on response.
 *
 * @static
 * @method Payworks#request
 *
 * @param {Object} requestOptions - Request Options
 * @param {Object} schema
 * @param {Object} params - Request Params
 * @param {(Object|undefined)} options - Extra options
 * @param {(string|undefined)} options.user - User
 * @param {(string|undefined)} options.password - Password
 * @param {(string|undefined)} options.merchant - Merchant ID
 * @param {(string|undefined)} options.terminal - Terminal ID
 * @param {(function|undefined)} callback
 *
 * @return {Promise}
 */
Payworks.request = require('./request')

module.exports = Payworks
