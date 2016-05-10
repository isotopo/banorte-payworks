Banorte Payworks for Node.js
================================

[![Build Status](https://travis-ci.org/4yopping/banorte-payworks.svg?branch=master)](https://travis-ci.org/4yopping/banorte-payworks)

## Install

```bash
$ npm install banorte-payworks
```

## Usage

```js
const Payworks = require('banorte-payworks')
const payworks = new Payworks({
  username: 'b4113901',
  password: 'b4113901',
  merchant: '8641401',
  terminal: '08641401'
})
```

### Using events

```js
// Create a preauthorization
payworks.preAuth({
  mount: 130.12,
  entry_mode: 'MANUAL',
  card_number: '4111111111111111',
  card_exp: '1220',
  security_code: '123'
})
.on('approved', function (body) {
  // saving to database or something else
})
.on('declined', function (err) {
  // send a notification or something else
})
```

### Using callbacks

```js
// Create a preauthorization
payworks.preAuth({
  mount: 130.12,
  entry_mode: 'MANUAL',
  card_number: '4111111111111111',
  card_exp: '1220',
  security_code: '123'
}, function (err, body, res) {
  if (err) {
    // send a notification or something else
  } else {
    // saving to database or something else
  }
})
```

### Using promises

```js
// Create a preauthorization
payworks.preAuth({
  mount: 130.12,
  entry_mode: 'MANUAL',
  card_number: '4111111111111111',
  card_exp: '1220',
  security_code: '123'
})
.then(function (body) {
  // saving to database or something else
})
.catch(function (err) {
  // send a notification or something else
})
```

## License

MIT
