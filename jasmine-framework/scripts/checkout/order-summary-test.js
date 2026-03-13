import renderOrderSummary from '../../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header"></div>
        `;
        
        // this spy will block the localStorage set new items, if he has been called.
        spyOn(localStorage, 'setItem');

        // this spy will return a string thats represent a cart with two products, WHEN the localStorage.getItem() is called
        spyOn(localStorage, 'getItem').and.returnValue(
            JSON.stringify(
                [{
                    id: productId1,
                    quantity: 1,
                    deliveryOptionId: '1'
                }, {
                    id: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'
                }]
            )
        );

        // this method will call the localStorage.getItem
        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        const productName1 = document.querySelector(`.js-product-name-${productId1}`).innerText;
        const productName2 = document.querySelector(`.js-product-name-${productId2}`).innerText;
        const priceProduct1 = document.querySelector(`.js-product-price-${productId1}`).innerText;
        const priceProduct2 = document.querySelector(`.js-product-price-${productId2}`).innerText;

        expect(productName1).
            toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        
        expect(productName2).
            toEqual("Intermediate Size Basketball");
        
        expect(priceProduct1).
            toContain("$");
        
        expect(priceProduct2).
            toContain("$");

        expect(document.querySelectorAll('.js-cart-item-container').length).
            toEqual(2);
        
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).
            toContain('Quantity: 1');
        
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).
            toContain('Quantity: 2');
    });

    it('removes from cart', () => {
        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].id).toEqual(productId2);
    });

    it('Update delivery option', () => {
        const deliveryOptionElement = document.
            querySelector(`.js-delivery-option-${productId1}-${'3'}`);
        const deliveryOptionInput = document.
        querySelector(`.js-delivery-option-input-${productId1}-${'3'}`);
            
        deliveryOptionInput.click();

        expect(deliveryOptionInput.checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.js-total-price').innerText).toEqual('$74.56');
    })
})