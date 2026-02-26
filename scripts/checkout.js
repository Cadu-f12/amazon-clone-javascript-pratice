import {cart, removeFromCart, updateCartHTML, updateQuantity, updateProductQuantityHTML} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

updateCartHTML();

let cartSummaryHTML = '';

cart.forEach((cartItem, radioNumber) => {
	let mathingProduct;

	products.forEach((product) => {
		if (product.id === cartItem.id) {
			mathingProduct = product;
		}
	});

	cartSummaryHTML += `
		<div class="cart-item-container js-cart-item-container-${mathingProduct.id}">
			<div class="delivery-date">
				Delivery date: Wednesday, June 15
			</div>

			<div class="cart-item-details-grid">
				<img class="product-image"
					src="${mathingProduct.image}">

				<div class="cart-item-details">
					<div class="product-name">
						${mathingProduct.name}
					</div>
					<div class="product-price">
						$${formatCurrency(mathingProduct.priceCents)}
					</div>
					<div class="product-quantity">
						<span>
							Quantity: <span class="quantity-label">${cartItem.quantity}</span>
						</span>
						<span class="update-quantity-link link-primary " data-product-id="${mathingProduct.id}">
							Update
						</span>
						<input class="quantity-input">
							<span class="save-quantity-link link-primary" data-product-id="${mathingProduct.id}">
							Save
							</span>
						<span class="delete-quantity-link link-primary" data-product-id="${mathingProduct.id}">
							Delete
						</span>
					</div>
				</div>

				<div class="delivery-options">
					<div class="delivery-options-title">
						Choose a delivery option:
					</div>

					<div class="delivery-option">
						<input type="radio" class="delivery-option-input"
							name="delivery-option-${radioNumber}">
						<div>
							<div class="delivery-option-date">
								Tuesday, June 21
							</div>
							<div class="delivery-option-price">
								FREE Shipping
							</div>
						</div>
					</div>
					<div class="delivery-option">
						<input type="radio" checked class="delivery-option-input"
							name="delivery-option-${radioNumber}">
						<div>
							<div class="delivery-option-date">
								Wednesday, June 15
							</div>
							<div class="delivery-option-price">
								$4.99 - Shipping
							</div>
						</div>
					</div>
					<div class="delivery-option">
						<input type="radio" class="delivery-option-input"
							name="delivery-option-${radioNumber}">
						<div>
							<div class="delivery-option-date">
								Monday, June 13
							</div>
							<div class="delivery-option-price">
								$9.99 - Shipping
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Delete button click listener
document.querySelectorAll('.delete-quantity-link').forEach((deleteObject) => {
	deleteObject.addEventListener('click', () => {
		const {productId} = deleteObject.dataset;
		const deletedObject = document.querySelector(`.js-cart-item-container-${productId}`);

		removeFromCart(productId);
		
		deletedObject.remove();

		updateCartHTML();
	});
});

// Update button click listener
document.querySelectorAll('.update-quantity-link').forEach((updateObject) => {
	updateObject.addEventListener('click', () => {
		const {productId} = updateObject.dataset;
		const cartItemContainerElem = document.querySelector('.cart-item-container');
		const inputQuantityElem = document.querySelector('.quantity-input');
		const saveButtonElement = document.querySelector('.save-quantity-link');
		
		cartItemContainerElem.classList.add('is-editing-quantity');
	});
});
// Save button click listener
document.querySelectorAll('.save-quantity-link').forEach((saveObject) => {
	saveObject.addEventListener('click', () => {
		const {productId} = saveObject.dataset;
		const cartItemContainerElem = document.querySelector('.cart-item-container');
		const inputQuantityElem = document.querySelector('.quantity-input');
		
		const newQuantity = Number(inputQuantityElem.value);

		updateQuantity(productId, newQuantity);

		cartItemContainerElem.classList.remove('is-editing-quantity');

		updateCartHTML();
		updateProductQuantityHTML(productId);
	});
})