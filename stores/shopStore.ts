export type { Category, Product } from "@/types/product"

export const useShopStore = defineStore('shopStore', {
    state: () => ({
        categorySelected: null as Category | null,
        priceMin: null as string | number | null,
        priceMax: null as string | number | null,
        cartList: [] as Product[]
    }),
    actions: {
        setCategorySelected(category: Category | null) {
            this.categorySelected = category; 
        },
        setPriceMin(price: string | number | null) {
            this.priceMin = price
        },
        setPriceMax(price: string | number | null) {
            this.priceMax = price
        }
    },
});