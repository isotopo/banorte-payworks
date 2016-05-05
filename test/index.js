'use strict'

const assert = require('assert')
const EventEmitter = require('events')
const Payworks = require('../lib')
const promiseEmitter = require('../lib/utils/promiseEmitter')

let options = {
  username: 'a7652969',
  password: 'a7652969',
  merchant: '7652969',
  terminal: '07652969'
}

let methods = Object.getOwnPropertyNames(Payworks.prototype)
methods = methods.filter(m => /^(?!constructor)/.test(m))

describe('Banorte Payworks', function() {
  it('should be a class', function() {
    assert.equal(typeof Payworks, 'function')
    assert(/^\s*class\s+/.test(Payworks.toString()), 'should be a class')
  })

  it('should be an instance of Payworks', function() {
    let payworks = new Payworks()
    assert(payworks instanceof Payworks, 'should be an instance')
  })

  it('should be an instance of EventEmitter', function() {
    let payworks = new Payworks()
    assert(payworks instanceof EventEmitter, 'should be an instance of EventEmitter')
  })

  it('should be instanced with options', function() {
    let payworks = new Payworks(options)

    assert.equal(payworks.username, options.username)
    assert.equal(payworks.password, options.password)
    assert.equal(payworks.merchant, options.merchant)
    assert.equal(payworks.terminal, options.terminal)
  })

  it('should have only this set of public methods', function() {
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

  it('The promiseEmitter class have a then and catch function', function(done) {
    let e = new promiseEmitter(function(res, rej) {
      console.log('dentro de la promesa');
      assert(this instanceof promiseEmitter)
      console.log('antes de random');
      let random = Math.random()
      console.log('random=', random);
      if (random < 0.33) {
        res(random)
        return
      } else if (random < 0.66) {
        throw random
        return
      }
      rej(random)
    })
    e.then(function(res) {
        console.log('dentro de then');
        assert(this instanceof promiseEmitter)
        assert(res < 0.33)
        done()
      })
      .catch(function(error) {
        console.log('dentro de catch', error);
        assert(this instanceof promiseEmitter)
        assert(error > 0.33)
        done()
      })
    this.e = e
  })

  it('The promiseEmitter class is a event emitter', function(done) {
    this.e.on('test', function(send) {
        assert(send === 'hola')
        done()
      })
      .emit('test', 'hola')
  })
})