'use strict'

const assert = require('assert')
const Payworks = require('../../lib')

let payworks = new Payworks({
  mode: 'AUT',
  merchant: '121221',
  user: 'AB912899',
  password: 'AB912899',
  terminal: '12212ABC'
})

describe('Payworks#preAuth', function () {
  beforeEach(function () {
    this.params = {
      amount: 189.00,
      entry_mode: 'MANUAL',
      card_number: '4111111111111111',
      card_exp: '1220',
      security_code: '123'
    }
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
    let required = [
      'amount',
      'card_number',
      'card_exp',
      'security_code'
    ]

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
  it('should obtain a result with a yieldable', function * () {
    let res = yield payworks.preAuth(this.params)
    assert(res.resultado_payw)
  })

  it('should obtain a result with thenable', function * (done) {
    payworks.preAuth(this.params)
    .then(function (body, res) {
      assert(body.resultado_payw)
      done()
    })
    .catch(done)
  })

  it('should obtain a result with events', function (done) {
    payworks.preAuth(this.params)
    .on('approved', function () {
      done()
    }).on('declined', function () {
      done()
    }).on('rejected', function () {
      done()
    }).on('notAnswer', function () {
      done()
    })
  })
})
