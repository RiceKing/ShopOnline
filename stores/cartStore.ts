import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: useLocalStorage<Product[]>('cart', [])
    }),
    getters: {
        totalCartProducts(state) {
            return state.cart.length;
        },
        productQuantity(state) {
            return (productId: number) => {
                const item = state.cart.find((item) => item.id === productId);
                return item?.quantity
            }
        },
        totalProductsPrice(state) {
            return state.cart.reduce((val, product) => val + product.price * product?.quantity, 0).toFixed(2)
        }
    },
    actions: {
        addProductToCart(product: Product) {
            const item = this.cart.find((item) => item.id === product.id);
            if (item) {
                if (item.quantity) {
                    return item.quantity++
                }
            } else {
                this.cart.push({ ...product , quantity: 1 })
            }
        },
        removeProductFromCart(productId: number) {
            const item = this.cart.find((item) => item.id === productId);

            if(item) {
                if( item.quantity && item.quantity > 1) {
                    return item.quantity--
                } else {
                    this.cart = this.cart.filter((item) => item.id !== productId)
                }
            }
        },
        clearCart() {
            this.cart = []
        }
    }
})