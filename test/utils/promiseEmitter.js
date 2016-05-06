'use strict'

const assert = require('assert')
const EventEmitter = require('events')
const PromiseEmitter = require('../../lib/utils/promiseEmitter')
describe('Utils#promiseEmitter', function () {
  it('should have a `then` and `catch` functions', function (done) {
    let e = new PromiseEmitter(function (res, rej) {
      assert(this instanceof PromiseEmitter)
      let random = Math.random()
      if (random < 0.33) {
        res(random)
        return
      } else if (random < 0.66) {
        throw random
      }
      rej(random)
    })
    e.then(function (res) {
      assert(this instanceof PromiseEmitter)
      assert(res < 0.33)
      return 'tested'
    })
      .then(function (resOfthen) {
        assert(resOfthen === 'tested')
        if (Math.random() < 0.5) {
          throw new Error('error to test')
        }
        done()
      })
      .catch(function (error) {
        assert(this instanceof EventEmitter)
        assert(this instanceof PromiseEmitter)
        assert(error > 0.33 || error.message === 'error to test')
        done()
      })
    this.e = e
  })

  it('should be an event emitter', function (done) {
    this.e.on('test', function (send) {
      assert(send === 'hola')
      done()
    })
      .emit('test', 'hola')
  })

  it('should return a chainable promises', function * () {
    let e = new PromiseEmitter((resolve) => resolve())

    let promise = e.then(function () {
      return new Promise((resolve, reject) => {
        resolve('hola')
      })
    })

    let result = yield promise
    assert.equal(result, 'hola')
  })
})
