export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) ||
  [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }
  ];
}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(value => cartQuantity += value.quantity);

  return cartQuantity;
}

export function addToCart(productId, quantity) {
  let mathingItem;

  cart.forEach((item) => {
    if (productId === item.id) {
      mathingItem = item;
    }
  });

  if (mathingItem) {
    mathingItem.quantity += quantity;
  } else {
    cart.push({
        id: productId,
        quantity,
        deliveryOptionId: '1'
    });
  }

  saveToLocalStorage();
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

export function updateCartHTML() {
  const totalCartQuantity = calculateCartQuantity();

  updateAmazonCart(totalCartQuantity);
}
function updateAmazonCart(totalCartQuantity) {
  const amazonCartItemsElem = document.querySelector('.cart-quantity');

  amazonCartItemsElem.innerHTML = totalCartQuantity;
} 

export function updateQuantityLabelHTML(productId) {
  const quantityLabelElem = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabelElem.innerHTML = getQuantity(productId);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let mathingItem;

  cart.forEach((item) => {
    if (productId === item.id) {
      mathingItem = item;
    }
  });

  mathingItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();
}

export function captureSelectorQuantity(productId) {
  const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);

  return Number(selectorElem.value);
}

function getQuantity(productId) {
  let product;

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      product = cartItem;
    }
  });

  return product.quantity;
}

export function setQuantity(productId, newQuantity) {
  let product;
  
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      product = cartItem;
    }
  });

  product.quantity = newQuantity;

  saveToLocalStorage();
}