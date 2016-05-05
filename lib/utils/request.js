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
  let promise = new Promise((resolve, reject) => {
    params = params || {}
    params.mode = params.mode || 'RND'
    try {
      assert(params.user, 'user is required')
      assert(params.password, 'password is required')
      assert(params.merchant_id, 'merchant_id is required')
      assert(params.cmd_trans, 'cmd_trans is required')
      assert(pattern.test(params.cmd_trans), 'cmd_trans is invalid')
    } catch (e) {
      return reject(e)
    }

    debug.info(params, 'request to payworks')
    request.post({ url: 'https://via.banorte.com/payw2', form: params }, function (err, res) {
      if (err) {
        debug.error(err, 'response error from payworks')
        return reject(err)
      } else {
        debug.info(res.headers, 'response headers from payworks')
      }
      resolve(res)
    })
  })

  // Resolve a promise when exists a callback
  if (typeof callback === 'function') {
    return promise.then((res) => callback(null, res)).catch(callback)
  }

  return promise
}
