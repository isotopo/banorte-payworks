'use strict'

const assert = require('assert')
const Payworks = require('../../lib')
const sinon = require('sinon')

let options = {
  username: 'a7652969',
  password: 'a7652969',
  merchant: '7652969',
  terminal: '07652969'
}

describe('Payworks#preAuth', function () {
  beforeEach(function () {
    this.payworks = new Payworks(options)
    this.params = {
      amount: 102.00,
      reference: 2187218721
    }
  })

  beforeEach(function () {
    this.spy = sinon.spy()
  })

  it('should validate params', function (done) {
    this.payworks.preAuth({}, this.spy)
    .on('error', (e) => {
      assert(this.spy.calledOnce)
      assert.equal(e.name, 'ValidationError')
      done()
    })
  })
})
