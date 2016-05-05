'use strict'
const EventEmitter = require('events')
let promiseEmitter = class extends EventEmitter {
  constructor (cb) {
    super()
    this.promise = new Promise(cb.bind(this))
  }
  then (res, rej) {
    this.promise = typeof rej === 'function' ? this.promise.then(res.bind(
      this), rej.bind(this)) : this.promise.then(res.bind(this))
    return this
  };
  catch (cb) {
    this.promise = this.promise.catch(cb.bind(this))
    return this
  };
}
module.exports = promiseEmitter
