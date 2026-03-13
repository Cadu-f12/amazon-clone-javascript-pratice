function Cart(localStorageKey) {
    const cart = {
        items: undefined,

        loadFromStorage() {
            this.items = JSON.parse(localStorage.getItem(localStorageKey)) ||
            [
                {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
                }
            ];
        },

        saveToLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.items));
        },

        addToCart(productId, quantity) {
            let mathingItem;

            this.items.forEach((item) => {
                if (productId === item.id) {
                mathingItem = item;
                }
            });

            if (mathingItem) {
                mathingItem.quantity += quantity;
            } else {
                this.items.push({
                    id: productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }

            this.saveToLocalStorage();
        },

        removeFromCart(productId) {
            const newCart = [];

            this.items.forEach((cartItem) => {
                if (cartItem.id !== productId) {
                newCart.push(cartItem);
                }
            });

            this.items = newCart;

            this.saveToLocalStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            let mathingItem;
            this.items.forEach((item) => {
                if (productId === item.id) {
                    mathingItem = item;
                }
            });

            if (mathingItem === undefined) {
                return;
            }
            if (deliveryOptionId !== '1' & deliveryOptionId !== '2' & deliveryOptionId !== '3') {
                return;
            }

            mathingItem.deliveryOptionId = deliveryOptionId;

            this.saveToLocalStorage();
        },

        calculateCartQuantity() {
            let cartQuantity = 0;

            this.items.forEach(value => cartQuantity += value.quantity);

            return cartQuantity;
        },

        updateAmazonCart(totalCartQuantity) {
            const amazonCartItemsElem = document.querySelector('.cart-quantity');

            amazonCartItemsElem.innerHTML = totalCartQuantity;
        },

        updateCartHTML() {
            const totalCartQuantity = this.calculateCartQuantity();

            this.updateAmazonCart(totalCartQuantity);
        },

        updateQuantityLabelHTML(productId) {
            const quantityLabelElem = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabelElem.innerHTML = getQuantity(productId);
        },

        captureSelectorQuantity(productId) {
            const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);

            return Number(selectorElem.value);
        },

        getQuantity(productId) {
            let product;

            this.items.forEach((cartItem) => {
                if (cartItem.id === productId) {
                product = cartItem;
                }
            });

            return product.quantity;
        },

        setQuantity(productId, newQuantity) {
            let product;
            
            this.items.forEach((cartItem) => {
                if (cartItem.id === productId) {
                product = cartItem;
                }
            });

            product.quantity = newQuantity;

            this.saveToLocalStorage();
        }
    }

    return cart;
}

const cart = Cart('cart-oop');
const cartBusiness = Cart('cart-business');

cart.loadFromStorage();
cartBusiness.loadFromStorage();

cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

console.log(cart.items);
console.log(cartBusiness.items);