'use strict'

const faker = require('faker')

let count = 15
let products = []

for (let i = 0; i < count; i++) {
  products.push({
    id: faker.random.uuid(),
    type: faker.commerce.product(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    material: faker.commerce.productMaterial(),
    adjective: faker.commerce.productAdjective(),
    department: faker.commerce.department(),
    image: faker.image.image(),
    description: faker.lorem.paragraph()
  })
}

module.exports = products
