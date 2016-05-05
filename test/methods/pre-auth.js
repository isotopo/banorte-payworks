'use strict'

const assert = require('assert')
const Payworks = require('../../lib')
const sinon = require('sinon')

let payworks = new Payworks({
  username: 'a7652969',
  password: 'a7652969',
  merchant: '7652969',
  terminal: '07652969'
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

  it('should be a yieldable', function * () {
    let pre = yield payworks.preAuth(this.params)

    pre.on('error', function () {
      console.log('wow!')
    })
  })
})
