'use strict'

const assert = require('assert')
const Payworks = require('../../lib')
const sinon = require('sinon')
const PromiseEmitter = require('../../lib/utils/promiseEmitter')

let payworks = new Payworks({
  cmd_trans: 'PREAUTH',
  merchant: '121221',
  user: 'AB912899',
  password: 'AB912899',
  terminal: '12212ABC'
})
describe('Payworks#preAuth', function () {
  beforeEach(function () {
    this.params = {
      amount: 102.00,
      reference: 2187218721
    }
  })

  beforeEach(function () {
    this.spy = sinon.spy()
  })

  it('should failed when params are missing', function (done) {
    try {
      payworks.preAuth()
      done('should throw an error when params are missing')
    } catch (e) {
      done()
    }
  })

  it('should validate params', function (done) {
    let required = ['amount', 'reference']

    payworks.preAuth({}).on('error', function (err) {
      try {
        assert.equal(err.name, 'ValidationError')

        for (let param of required) {
          // Get error from each path
          let e = err.details.filter(e => e.path === param)
          assert(e.length, `should throws a validation error when the \`${param}\` property is missing`)
          assert.equal(e[0].type, 'any.required')
        }
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be a yieldable', function * (done) {
    let res = payworks.preAuth(this.params)
    .then(function (res) {
      assert(this instanceof PromiseEmitter)
      done()
      return 'hola'
    })
    .catch(function (error) {
      assert(this instanceof PromiseEmitter)
      done()
      return error
    })
    res = yield res
    assert(res === 'hola')
  })
  it('obtain the correct answer', function * (done) {
    let res = payworks.preAuth({ amount: 189.00,
      entry_mode: 'MANUAL',
      card_number: '4111111111111111',
      card_exp: '1220'})
    .then(function (res) {
      console.log('res', res.headers)
      assert(this instanceof PromiseEmitter)
      done()
      return 'hola'
    })
    .catch(function (error) {
      console.log('errr', error)
      assert(this instanceof PromiseEmitter)
      done()
      return error
    })
    res = yield res
    assert(res === 'hola')
  })
})
