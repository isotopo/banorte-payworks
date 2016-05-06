'use strict'

const assert = require('assert')
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
    let e = new PromiseEmitter((resolve, reject) => {
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
        res.headers.payw_code && (e.emit(res.headers.payw_code, res.headers))
        res.headers.payw_result === 'A' && (e.emit('approved', res.headers))
        res.headers.payw_result === 'D' && (e.emit('declined', res.headers))
        res.headers.payw_result === 'R' && (e.emit('rejected', res.headers))
        res.headers.payw_result === 'T' && (e.emit('notAnswer', res.headers))
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
  devolution (params, options, callback) {}

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
  close (params, options, callback) {
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
  closeGroup (params, options, callback) {
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
  verify (params, options, callback) {
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
  suspend (params, options, callback) {
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
  reactivate (params, options, callback) {
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
}

module.exports = Payworks
