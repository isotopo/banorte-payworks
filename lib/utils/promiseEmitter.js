'use strict'
const EventEmitter = require('events')
module.exports = class extends EventEmitter {
  constructor(cb) {
    super()
    console.log('por entrar a la promesa');
    this.promise = new Promise(cb.bind(this));
  }
  then(cb) {
    this.promise = this.promise.then(cb.bind(this))
    return this
  }
  catch (cb) {
    this.promise = this.promise.catch(cb.bind(this))
    return this
  }
}