export let cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 1
}, {
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}, {
  id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
  quantity: 1
}]

export function addToCart(productId, quantity) {
  let mathingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      mathingItem = item;
    }
  })

  if (mathingItem) {
    mathingItem.quantity += quantity;
  } else {
    cart.push({
        productId,
        quantity
    });
  }
}

export function updateCart() {
  let cartQuantity = 0;
  
  cart.forEach(value => cartQuantity += value.quantity);

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

export function getQuantity(productId) {
  const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);

  return Number(selectorElem.value);
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
} 