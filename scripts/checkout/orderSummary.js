import {cart, removeFromCart, setQuantity, updateCartHTML, updateDeliveryOption, updateQuantityLabelHTML} from '../../data/cart.js';
import {getProductById} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js'; 

export function renderOrderSummary() {
    updateCartHTML();

    let cartSummaryHTML = '';

    cart.forEach((cartItem, index) => {
        const mathingProduct = getProductById(cartItem.id);

        const deliveryRadioOption = getDeliveryOption(cartItem.deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryRadioOption.deliveryDays, 'days');
        const deliveryString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${mathingProduct.id}">
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
                        <div class="product-quantity">
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
            
            // DeliveyTime
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const deliveryString = deliveryDate.format('dddd, MMMM D');

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
        
        updateCartHTML();
        updateQuantityLabelHTML(productId);
        renderPaymentSummary();
    }
    function deleteContainer(object) {
        const {productId} = object.dataset;
        const containerObject = document.querySelector(`.js-cart-item-container-${productId}`);

        removeFromCart(productId);
        
        containerObject.remove();

        updateCartHTML();
        renderPaymentSummary();
    }
    function showInput(object) {
        const {productId} = object.dataset;
        const cartItemContainerElem = document.querySelector(`.js-cart-item-container-${productId}`);

        cartItemContainerElem.classList.add('is-editing-quantity');
    }
}