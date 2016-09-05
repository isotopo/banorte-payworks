'use strict'
module.exports = function (params) {
  for (let prop in this.default) {
    params[prop] = this.default[prop]
  }
}
