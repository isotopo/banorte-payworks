'use strict'
const EventEmitter = require('events')
let promiseEmitter = class extends EventEmitter {
  constructor (executor) {
    super()
    this.promise = new Promise(executor.bind(this))
  }
  then (res, rej) {
    this.promise = typeof rej === 'function' ? this.promise.then(res.bind(
      this), rej.bind(this)) : this.promise.then(res.bind(this))
    return this
  };
  catch (error) {
    this.promise = this.promise.catch(error.bind(this))
    return this
  };
}
module.exports = promiseEmitter
