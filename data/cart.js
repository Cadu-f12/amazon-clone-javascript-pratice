export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
  }]
}

console.log(cart);

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let mathingItem;

  cart.forEach((item) => {
    if (productId === item.id) {
      mathingItem = item;
    }
  })

  if (mathingItem) {
    mathingItem.quantity += quantity;
  } else {
    cart.push({
        id: productId,
        quantity: quantity
    });
  }

  saveToLocalStorage();
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

  saveToLocalStorage();
} 