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
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  auth (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    let options = {
      eventPrefixName: 'auth',
      transactionName: 'AUTH'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a force authorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  forceAuth (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    let options = {
      eventPrefixName: 'forceAuth',
      transactionName: 'FORCED_AUTH'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a preauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {string} params.entry_code - Entry Code
   * @param {string} params.card_number - Card Number
   * @param {string} params.card_exp - Card Expiry Dates (MM/YY)
   * @param {string} params.security_code - Security Code
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  preAuth (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string(),
      entry_mode: joi.string().max(20).required(),
      card_number: joi.string().max(20).required(),
      card_exp: joi.string().max(4).required(),
      security_code: joi.string().max(4).required()
    }

    let options = {
      eventPrefixName: 'preAuth',
      transactionName: 'PREAUTH'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a postauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  postAuth (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'postAuth',
      transactionName: 'POSTAUTH'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a reauthorization
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reAuth (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'reAuth',
      transactionName: 'REAUTH'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a refund
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {number} params.amount - Amount
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  refund (params, callback) {
    let schema = {
      amount: joi.number().required(),
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'refund',
      transactionName: 'REFUND'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a cancellation
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  cancel (params, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'cancel',
      transactionName: 'VOID'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a reverse
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reverse (params, callback) {
    let schema = {
      reference: joi.string().required(),
      control_number: joi.string().max(30)
    }

    let options = {
      eventPrefixName: 'reverse',
      transactionName: 'REVERSAL'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for closing a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  close (params, callback) {
    let schema = {}

    let options = {
      eventPrefixName: 'close',
      transactionName: 'MCHNT_SETTLEMENT'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for closing a transaction group
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.group - Group
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  closeGroup (params, callback) {
    let schema = {
      group: joi.string().required()
    }

    let options = {
      eventPrefixName: 'closeGroup',
      transactionName: 'GROUP_SETTLEMENT'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for a transaction verification
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {string} params.control_number - Control Number
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  verify (params, callback) {
    let schema = {
      reference: joi.string(),
      control_number: joi.string()
    }

    let options = {
      eventPrefixName: 'verify',
      transactionName: 'VERIFY'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for suspend a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  suspend (params, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'suspend',
      transactionName: 'LOCK'
    }

    return Payworks.request.call(this, options, schema, params, callback)
  }

  /**
   * Request for reactivate a transaction
   *
   * @public
   *
   * @param {Object} params - Request params
   * @param {string} params.reference - Reference
   * @param {(Function|undefined)} callback
   *
   * @return {PromiseEmitter}
   */
  reactivate (params, callback) {
    let schema = {
      reference: joi.string().required()
    }

    let options = {
      eventPrefixName: 'reactivate',
      transactionName: 'UNLOCK'
    }

    return Payworks.request.call(this, options, schema, params, callback)
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
 * @param {Object} params - Request param
 * @param {(function|undefined)} callback
 *
 * @return {PromiseEmitter}
 */
Payworks.request = require('./request')

module.exports = Payworks
