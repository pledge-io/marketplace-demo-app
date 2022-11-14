document.addEventListener('DOMContentLoaded', function () {
  // Update checkout totals
  const checkoutQuantityInput = document.getElementById('checkout-quantity')
  const simulatePaymentButton = document.getElementById('order-simulate-payment')

  if (checkoutQuantityInput) {
    // handle quantity input change
    document
      .getElementById('checkout-quantity')
      .addEventListener('keyup', calculateOrder)

    // handle buy button click
    document
      .getElementById('checkout-buy-button')
      .addEventListener('click', placeOrder)
  }

  if (simulatePaymentButton) {
    // handle simulate payment button click
    simulatePaymentButton
      .addEventListener('click', simulateSimulateSuccessfulPayment)
  }
})

function calculateOrder (event) {
  const quantity = event.target.value
  const { price, currency } = event.target.dataset
  const subTotal = (quantity * price).toFixed(2)
  const total = subTotal

  document.getElementById(
    'checkout-subtotal'
  ).innerHTML = `${currency} ${subTotal}`
  document.getElementById(
    'checkout-total'
  ).innerHTML = `${currency} ${total}`
}

function placeOrder () {
  const quantityInput = document.getElementById('checkout-quantity')
  const quantity = quantityInput.value
  const portfolioId = quantityInput.dataset.portfolio

  if (quantity <= 0) {
    return
  }

  toggleCheckoutProcessingState(true)

  fetch(`/checkout/${portfolioId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity })
  })
    .then((response) => response.json())
    .then((order) => {
      setTimeout(() => {
        window.location.href = `/orders/${order.id}`
      }, 2000)
    })
    .catch((error) => {
      console.log(error)
      toggleCheckoutProcessingState(false)
    })
}

function simulateSimulateSuccessfulPayment () {
  const simulatePaymentButton = document.getElementById('order-simulate-payment')
  const orderId = simulatePaymentButton.dataset.orderId

  toggleOrderProcessingState(true)
  fetch(`/orders/${orderId}/pay`, { method: 'PUT' })
    .then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
    .catch((error) => {
      console.log(error)
      toggleOrderProcessingState(false)
    })
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
