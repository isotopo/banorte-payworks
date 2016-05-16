function getProducts () {
  var products = localStorage.getItem('products')
  try {
    return JSON.parse(products)
  } catch (e) {}
}

function updateBadge () {
  var products = getProducts()
  var badge = $('#checkout .badge').text('')

  if (products) {
    var count = 0

    $.each(products, function (key, product) {
      count += product.count
    })

    badge.text(count)
  }
}

updateBadge()

$('.add-to-cart').click(function (e) {
  e.preventDefault()

  var products = getProducts()
  var id = $(e.currentTarget).attr('data-product')
  var product = $('#product-' + id)

  if (!products) {
    products = {}
  }

  if (products[id]) {
    products[id].count++
  } else {
    products[id] = {
      count: 1,
      name: product.find('.product-name').text(),
      price: product.find('.product-price').text(),
      image: product.find('.product-image').text(),
      description: product.find('.product-description').text()
    }
  }

  localStorage.setItem('products', JSON.stringify(products))
  Materialize.toast('Product added', 4000)
  updateBadge()
})

$('#checkout').click(function (e) {
  e.preventDefault()

  var products = getProducts()
  var form = $('#form')
  form.find('.status').addClass('hide')

  var totalPriceElement = $('.total-price').text('')
  if (products) {
    var totalPrice = 0
    $.each(products, function (key, product) {
      var price = parseFloat(product.price, 10) * product.count
      totalPrice += price
    })

    totalPriceElement.text(totalPrice.toFixed(2))
  }

  if (totalPrice > 0) {
    form.find('button').prop('disabled', false)
  } else {
    form.find('button').prop('disabled', true)
  }

  form.openModal()
})

$('#form').submit(function (e) {
  e.preventDefault()

  var form = $(this)
  var spinner = form.find('.spinner')
  var status = form.find('.status')

  spinner.removeClass('hide')
  status.text('').addClass('hide').removeClass('green red')

  $.post('/checkout', {
    firstname: form.find('input[name="first_name"]').val(),
    lastname: form.find('input[name="last_name"]').val(),
    cc: form.find('input[name="cc"]').val(),
    security_code: form.find('input[name="security_code"]').val(),
    expiry_date: form.find('input[name="expiry_date"]').val(),
    total_price: form.find('.total-price').text()
  })
  .done(function (res) {
    if (res.code === 0) {
      form.find('button').prop('disabled', true)
      setTimeout(function () { form.closeModal() }, 3000)
      status.text(res.message).addClass('green').removeClass('hide')
      localStorage.removeItem('products')
      updateBadge()
    } else {
      status.text(res.message).addClass('red').removeClass('hide')
    }
  })
  .fail(function () {
    status.text('Error').addClass('red').removeClass('hide')
  })
  .always(function () {
    spinner.addClass('hide')
  })
})
