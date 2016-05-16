'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('nunjucks')
const Router = require('koa-router')
const serve = require('koa-static')
const logger = require('koa-logger')
const products = require('./data/products')
const payworks = require('./lib/payworks')
const debug = require('debug')('payworks')

let app = new Koa()
let router = new Router()

nunjucks.configure('views', {
  noCache: true,
  autoscape: true
})

app.use(bodyParser())
app.use(logger())
app.use(serve('public'))
app.use(router.routes())

router.get('/', function * () {
  this.body = nunjucks.render('products.html', {
    products: products
  })
})

router.get('/products.json', function * () {
  this.body = products
})

router.post('/checkout', function * () {
  debug(this.request.body)

  let auth = yield payworks.auth({
    entry_mode: 'MANUAL',
    amount: parseFloat(this.request.body.total_price).toFixed(2),
    card_number: this.request.body.cc,
    card_exp: this.request.body.expiry_date,
    security_code: this.request.body.security_code
  })

  if (auth.resultado_payw === 'A') {
    this.body = {
      code: 0,
      message: 'Credit Card has been approved'
    }
  } else if (auth.resultado_payw === 'D') {
    this.body = {
      code: 5182,
      message: 'Credit Card has been declined'
    }
  } else {
    this.body = {
      code: 1182
    }
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening at ${process.env.PORT || 3000}`)
})

module.exports = app
