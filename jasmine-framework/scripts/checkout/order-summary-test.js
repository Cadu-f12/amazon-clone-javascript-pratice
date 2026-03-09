import renderOrderSummary from '../../../scripts/checkout/orderSummary.js';
import {loadFromStorage} from '../../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
        `;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

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

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2');
    });
})