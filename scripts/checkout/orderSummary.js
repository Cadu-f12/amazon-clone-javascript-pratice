import renderPaymentSummary from './paymentSummary.js'; 
import renderCheckoutHeader from './checkout-header.js';
import {cart, removeFromCart, setQuantity, updateDeliveryOption, updateQuantityLabelHTML} from '../../data/cart.js';
import {getProductById} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOption, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';

export default function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem, index) => {
        const mathingProduct = getProductById(cartItem.id);

        const deliveryRadioOption = getDeliveryOption(cartItem.deliveryOptionId);

        const deliveryString = calculateDeliveryDate(deliveryRadioOption);

        cartSummaryHTML += `
            <div class="cart-item-container
            js-cart-item-container
            js-cart-item-container-${mathingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${mathingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${mathingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(mathingProduct.priceCents)}
                        </div>
                        <div class="product-quantity
                        js-product-quantity-${mathingProduct.id}">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${mathingProduct.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary" data-product-id="${mathingProduct.id}">
                                Update
                            </span>
                            <input class="quantity-input js-quantity-input-${mathingProduct.id}" value="0">
                            <span class="save-quantity-link link-primary" data-product-id="${mathingProduct.id}">
                                Save
                            </span>
                            <span class="delete-quantity-link link-primary" data-product-id="${mathingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        ${deliveryOptionHTML(index, cartItem)}
                    </div>
                </div>
            </div>
        `
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // DeliveryOption HTML
    function deliveryOptionHTML(i, cartItem) {
        let html = '';

        deliveryOption.forEach((deliveryOption) => {
            
            const deliveryString = calculateDeliveryDate(deliveryOption);

            // Price
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`; 

            const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

            html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${cartItem.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                    name="delivery-option-${i}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString}
                    </div>
                </div>
            </div>
            `
        });

        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);

            renderOrderSummary();

            renderPaymentSummary();
        });
    });

    // Delete button click listener
    document.querySelectorAll('.delete-quantity-link').forEach((deleteObject) => {
        deleteObject.addEventListener('click', () => deleteContainer(deleteObject));
    });

    // Update button click listener
    document.querySelectorAll('.update-quantity-link').forEach((updateObject) => {
        updateObject.addEventListener('click', () => showInput(updateObject));
    });

    // Save button click listener
    document.querySelectorAll('.save-quantity-link').forEach((saveObject) => {
        saveObject.addEventListener('click', () => saveQuantity(saveObject));
    });

    function validateQuantity(inputValue) {
        const value = Number(inputValue);

        if (value < 0) {
            return 0;
        }

        return value;
    }

    // Update and delete buttons functions
    function saveQuantity(object) {
        const {productId} = object.dataset;
        const cartItemContainerElem = document.querySelector(`.js-cart-item-container-${productId}`);
        const inputQuantityElem = document.querySelector(`.js-quantity-input-${productId}`);
        
        setQuantity(productId, validateQuantity(inputQuantityElem.value));
        
        inputQuantityElem.value = 0;
        
        cartItemContainerElem.classList.remove('is-editing-quantity');
        
        renderCheckoutHeader();
        updateQuantityLabelHTML(productId);
        renderPaymentSummary();
    }
    function deleteContainer(object) {
        const {productId} = object.dataset;
        const containerObject = document.querySelector(`.js-cart-item-container-${productId}`);

        removeFromCart(productId);
        
        containerObject.remove();

        renderCheckoutHeader();
        renderPaymentSummary();
    }
    function showInput(object) {
        const {productId} = object.dataset;
        const cartItemContainerElem = document.querySelector(`.js-cart-item-container-${productId}`);

        cartItemContainerElem.classList.add('is-editing-quantity');
    }
}