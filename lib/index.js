'use strict'

const EventEmitter = require('events')
const request = require('./utils').request

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
  preAuth (params, options, callback) {}

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
