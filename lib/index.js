'use strict'

const co = require('co')
const EventEmitter = require('events')
const request = require('./utils').request
const validate = require('./utils').validate
const joi = require('joi')
const PromiseEmitter = require('./utils/promiseEmitter')

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
Payworks.prototype.auth = function (params, options, callback) {}

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
Payworks.prototype.forceAuth = function (params, options, callback) {}

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
Payworks.prototype.preAuth = require('./transactions/pre-auth')

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
Payworks.prototype.postAuth = function (params, options, callback) {}

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
Payworks.prototype.reAuth = function (params, options, callback) {}

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
Payworks.prototype.refund = function (params, options, callback) {}

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
Payworks.prototype.cancel = function (params, options, callback) {

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
Payworks.prototype.reverse = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
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
Payworks.prototype.close = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
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
Payworks.prototype.closeGroup = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
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
Payworks.prototype.verify = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
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
Payworks.prototype.suspend = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
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
Payworks.prototype.reactivate = function (params, options, callback) {
  let e = new PromiseEmitter(function (resolve, reject) {
    co(function * () {
      yield validate(params, {
        amount: joi.number().required()
      })
      return yield request({
        cmd_trans: 'PREAUTH',
        user: this.username,
        password: this.password,
        merchant_id: this.merchant
      })
    })
      .then(function (resRequest) {
        e.emit('resolve', resRequest)
        if (typeof callback === 'function') {
          resolve(callback(null, resRequest))
          return
        }
        resolve(resRequest)
      })
      .catch(function (error) {
        e.emit('error', error)
        if (typeof callback === 'function') {
          reject(callback(error, null))
          return
        }
        reject(error)
      })
  })
  return e
}

module.exports = Payworks
