'use strict'

const assert = require('assert')
const EventEmitter = require('events')
const Payworks = require('../lib')

let options = {
  username: 'a7652969',
  password: 'a7652969',
  merchant: '7652969',
  terminal: '07652969'
}

let methods = Object.getOwnPropertyNames(Payworks.prototype)
methods = methods.filter(m => /^(?!constructor)/.test(m))

describe('Banorte Payworks', function () {
  it('should be a class', function () {
    assert.equal(typeof Payworks, 'function')
    assert(/^\s*class\s+/.test(Payworks.toString()),
      'should be a class')
  })

  it('should be an instance of Payworks', function () {
    let payworks = new Payworks()
    assert(payworks instanceof Payworks, 'should be an instance')
  })

  it('should be an instance of EventEmitter', function () {
    let payworks = new Payworks()
    assert(payworks instanceof EventEmitter,
      'should be an instance of EventEmitter')
  })

  it('should be instanced with options', function () {
    let payworks = new Payworks(options)

    assert.equal(payworks.user, options.user)
    assert.equal(payworks.password, options.password)
    assert.equal(payworks.merchant_id, options.merchant)
    assert.equal(payworks.terminal_id, options.terminal)
  })

  it('should have only this set of public methods', function () {
    let fns = [
      'auth',
      'forceAuth',
      'preAuth',
      'postAuth',
      'reAuth',
      'refund',
      'cancel',
      'reverse',
      'close',
      'closeGroup',
      'verify',
      'suspend',
      'reactivate'
    ]

    assert.equal(fns.length, methods.length)
    for (let fn of fns) {
      assert.equal(typeof Payworks.prototype[fn], 'function')
    }
  })
})
