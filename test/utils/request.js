'use strict'

const assert = require('assert')
const request = require('../../lib/utils').request

let params = {
  cmd_trans: 'PREAUTH',
  merchant_id: '121221',
  user: 'AB912899',
  password: 'AB912899',
  terminal_id: '12212ABC',
  amount: 189.00,
  entry_mode: 'MANUAL',
  card_number: '4111111111111111',
  card_exp: '1220'
}

describe('Utils#Request', function () {
  it('should be a function', function () {
    assert.equal(typeof request, 'function')
  })

  it('should make a request', function (done) {
    request(params, function (err, res) {
      if (err) return done(err)

      assert.equal(res.statusCode, 200)
      assert.equal(res.headers.codigo_payw, 'PAYW-3002')
      assert.equal(res.headers.resultado_payw, 'R')

      done()
    })
  })

  it('should not make a request without `user` param', function (done) {
    request({
      password: params.password,
      merchant_id: params.merchant_id,
      cmd_trans: params.cmd_trans
    }, function (err, res) {
      if (err) {
        assert.equal(err.message, 'user is required')
        return done()
      }

      done('should throw an error')
    })
  })

  it('should not make a request without `password` param', function (done) {
    request({
      user: params.user,
      merchant_id: params.merchant_id,
      cmd_trans: params.cmd_trans
    }, function (err, res) {
      if (err) {
        assert.equal(err.message, 'password is required')
        return done()
      }

      done('should throw an error')
    })
  })

  it('should not make a request without `merchant_id` param', function (done) {
    request({
      user: params.user,
      password: params.password,
      cmd_trans: params.cmd_trans
    }, function (err, res) {
      if (err) {
        assert.equal(err.message, 'merchant_id is required')
        return done()
      }

      done('should throw an error')
    })
  })

  it('should not make a request without `cmd_trans` param', function (done) {
    request({
      user: params.user,
      password: params.password,
      merchant_id: params.merchant_id
    }, function (err, res) {
      if (err) {
        assert.equal(err.message, 'cmd_trans is required')
        return done()
      }

      done('should throw an error')
    })
  })
})
