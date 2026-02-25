export let cart = JSON.parse(localStorage.getItem('cart'));

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