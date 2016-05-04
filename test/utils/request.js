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

  it('should make a request only with valid `cmd_trans`', function (done) {
    request(Object.assign(params, {
      cmd_trans: 'PREAUHT'
    }), function (err) {
      if (!err) return done('should throw an error')

      assert(err)
      assert.equal(err.message, 'cmd_trans is invalid')
    })

    request(Object.assign(params, {
      cmd_trans: 'AUTHH'
    }), function (err) {
      if (!err) return done('should throw an error')

      assert(err)
      assert.equal(err.message, 'cmd_trans is invalid')
    })

    request(Object.assign(params, {
      cmd_trans: 'AUTH'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'FORCED_AUTH'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'PREAUTH'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'REAUTH'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'POSTAUTH'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'REFUND'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'VOID'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'REVERSAL'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'MCHNT_SETTLEMENT'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'GROUP_SETTLEMENT'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'VERIFY'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'LOCK'
    }), function (err) {
      if (err) return done('should not throw an error')
    })

    request(Object.assign(params, {
      cmd_trans: 'UNLOCK'
    }), function (err) {
      if (err) return done('should not throw an error')
      done()
    })
  })
})
