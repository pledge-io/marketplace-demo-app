document.addEventListener('DOMContentLoaded', function () {
  // Update checkout totals
  const checkoutForm = document.getElementById('order-checkout-form')
  const checkoutQuantityInput = document.getElementById('checkout-quantity')
  const simulatePaymentButton = document.getElementById('order-simulate-payment')

  if (checkoutQuantityInput) {
    // handle quantity input change
    document
      .getElementById('checkout-quantity')
      .addEventListener('keyup', calculateOrder)
  }

  if (checkoutForm) {
    // handle buy button click
    checkoutForm.addEventListener('submit', placeOrder)
  }

  if (simulatePaymentButton) {
    // handle simulate payment button click
    simulatePaymentButton
      .addEventListener('click', simulateSuccessfulPayment)
  }
})

function calculateOrder (event) {
  const quantity = event.target.value
  const { price, currency } = event.target.dataset

  let pledgeServiceFee = parseFloat(window.PLEDGE_SERVICE_FEE)
  if (isNaN(pledgeServiceFee)) {
    pledgeServiceFee = 0
  }

  const subtotal = Number((quantity * price).toFixed(2))
  const serviceFee = Number((subtotal * pledgeServiceFee).toFixed(2))
  const total = Number((subtotal + serviceFee).toFixed(2))

  document.getElementById(
    'checkout-subtotal'
  ).innerHTML = `${currency} ${subtotal}`

  document.getElementById(
    'checkout-service-fee'
  ).innerHTML = `${currency} ${serviceFee}`

  document.getElementById(
    'checkout-total'
  ).innerHTML = `${currency} ${total}`
}

function placeOrder (event) {
  event.preventDefault()
  toggleCheckoutProcessingState(true)
  document.getElementById('order-checkout-form').submit()
}

function simulateSuccessfulPayment (event) {
  event.preventDefault()
  toggleOrderProcessingState(true)
  document.getElementById('order-simulate-payment').submit()
}

function toggleCheckoutProcessingState (state) {
  if (state) {
    document.getElementById('checkout-form').classList.add('invisible')
    document.getElementById('checkout-processing').classList.remove('invisible')
  } else {
    document.getElementById('checkout-processing').classList.add('invisible')
    document.getElementById('checkout-form').classList.remove('invisible')
  }
}

function toggleOrderProcessingState (state) {
  if (state) {
    document.getElementById('order-content').classList.add('invisible')
    document.getElementById('order-processing').classList.remove('invisible')
  } else {
    document.getElementById('order-processing').classList.add('invisible')
    document.getElementById('order-content').classList.remove('invisible')
  }
}
