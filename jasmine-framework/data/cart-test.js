import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('Add a new product to cart', () => {
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); 
        // To this especify test we will need to force the localStorage.getItem('cart') returns a empty array, then i use a Mocked function named spyOn().
        
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1);
    });

    it('Add a existing product to cart', () => {
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.returnValue(
            JSON.stringify( [ {
                id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
            } ] )
        );

        loadFromStorage();
        
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);

        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    });
});

console.log(cart);