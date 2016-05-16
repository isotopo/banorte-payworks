'use strict'

const Payworks = require('../../../lib')
const debug = require('debug')('payworks')

let payworks = new Payworks({
  merchant: '7652969',
  terminal: '07652969',
  user: 'a7652969',
  password: 'a7652969'
})

.on('auth.approved', function (body) {
  debug(body, 'auth.approved')
})

.on('auth.declined', function (body) {
  debug(body, 'auth.declined')
})

.on('auth.rejected', function (body) {
  debug(body, 'auth.rejected')
})

.on('auth.notAnswer', function (body) {
  debug(body, 'auth.notAnswer')
})

module.exports = payworks
