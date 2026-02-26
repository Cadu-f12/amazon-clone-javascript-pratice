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

function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(value => cartQuantity += value.quantity);

  return cartQuantity;
}

export function updateCartHTML() {
  const checkoutItemsElem = document.querySelector('.js-return-to-home-link');
  const amazonCartItemsElem = document.querySelector('.cart-quantity');
  
  const cartAllQuantity = calculateCartQuantity();

  // If checkout items dosent exists 
  if (checkoutItemsElem) {
    checkoutItemsElem.innerHTML = `${cartAllQuantity} Items`;
    return;
  }

  amazonCartItemsElem.innerHTML = cartAllQuantity;
}

export function updateProductQuantityHTML(productId) {
  const quantityLabelElem = document.querySelector('.quantity-label');
  let product;

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      product = cartItem;
    }
  });

  quantityLabelElem.innerHTML = product.quantity;
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

export function updateQuantity(productId, newQuantity) {
  let product;
  
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      product = cartItem;
    }
  });

  product.quantity = newQuantity;

  saveToLocalStorage();
}