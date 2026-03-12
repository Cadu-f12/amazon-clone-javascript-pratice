import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    
    beforeEach( () => {
        spyOn(localStorage, 'setItem');
    });
    
    it('Add a new product to cart', () => {
        
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([])); 
        // To this especify test we will need to force the localStorage.getItem('cart') returns a empty array, then i use a Mocked function named spyOn().
        
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"id":"15b6fc6f-327a-4ec4-896f-486349e85a3d","quantity":1,"deliveryOptionId":"1"}]');
    });

    it('Adds an existing product to cart', () => {
        
        spyOn(localStorage, 'getItem').and.returnValue(
            JSON.stringify(
                [{
                    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]
            )
        );

        loadFromStorage();
        
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);

        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"id":"15b6fc6f-327a-4ec4-896f-486349e85a3d","quantity":2,"deliveryOptionId":"1"}]');
    });

});

describe('test suite: removeFromCart', () => {
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.returnValue(
            JSON.stringify([
                {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '3'
                },{
                    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    quantity: 9,
                    deliveryOptionId: '1'
                }
            ])  
        );
    });
    
    it('Removes a product from the cart', () => {
        
        loadFromStorage();

        removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart[0].quantity).toEqual(9);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });
    
    it('Removes a product that is NOT in the cart', () => {
        loadFromStorage();

        removeFromCart("3ebe75dc-64d2-4137-8860-1f5a963e534b");

        expect(cart.length).toEqual(2);
        expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[1].id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    });
})