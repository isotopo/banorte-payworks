'use strict'

const assert = require('assert')
const debug = require('./debug')
const request = require('request')

// Valid Calls
let calls = [
  'AUTH',
  'FORCED_AUTH',
  'PREAUTH',
  'REAUTH',
  'POSTAUTH',
  'REFUND',
  'VOID',
  'REVERSAL',
  'MCHNT_SETTLEMENT',
  'GROUP_SETTLEMENT',
  'VERIFY',
  'LOCK',
  'UNLOCK'
]

calls = calls.map(call => '\\b' + call + '\\b')
let pattern = new RegExp(`(${calls.join('|')})`)

/**
 * @private
 *
 * @param {String} params
 * @callback {(Function|undefined)} callback
 */
module.exports = function (params, callback) {
  callback = typeof callback === 'function' ? callback : function noop () {}

  params = params || {}
  params.mode = params.mode || 'RND'

  try {
    assert(params.user, 'user is required')
    assert(params.password, 'password is required')
    assert(params.merchant_id, 'merchant_id is required')
    assert(params.cmd_trans, 'cmd_trans is required')
    assert(pattern.test(params.cmd_trans), 'cmd_trans is invalid')
  } catch (e) {
    return callback(e, null)
  }

  debug.info(params, 'request to payworks')
  request.post({ url: 'https://via.banorte.com/payw2', form: params }, function (err, res) {
    if (err) {
      debug.err(err, 'response error from payworks')
    } else {
      debug.info(res.headers, 'response headers from payworks')
    }

    callback.apply(this, arguments)
  })
}
