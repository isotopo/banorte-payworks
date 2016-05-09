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

describe('Payworks#suspend', function () {
  beforeEach(function () {
    this.params = {
      reference: '91289218'
    }
  })

  it('should failed when params are missing', function (done) {
    try {
      payworks.suspend()
      done('should throw an error when params are missing')
    } catch (e) {
      done()
    }
  })

  it('should validate params', function (done) {
    let required = [
      'reference'
    ]

    payworks.suspend({}).on('error', function (err) {
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

  it('should obtain a result with callbacks', function (done) {
    payworks.suspend(this.params, function (error, body, response) {
      if (error) {
        try {
          assert(/^(R|D|T)$/i.test(error.resultado_payw), 'should throw a transactional error')
          return done()
        } catch (e) {
          return done(e)
        }
      }

      assert(body.resultado_payw)
      assert(response.headers)
      assert.equal(response.headers.resultado_payw, body.resultado_payw)
      done()
    })
  })

  it('should obtain a result with yieldables', function * () {
    let body = yield payworks.suspend(this.params)
    assert(body.resultado_payw)
  })

  it('should obtain a result with thenables', function * (done) {
    payworks.suspend(this.params)
    .then(function (body) {
      assert(body.resultado_payw)
      done()
    })
    .catch(done)
  })

  it('should obtain a result with events', function (done) {
    payworks.suspend(this.params)
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
