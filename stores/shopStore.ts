export type { Category, Product } from "@/types/product"

export const useShopStore = defineStore('shopStore', {
    state: () => ({
        categorySelected: null as Category | null,
        priceMin: null as string | number | null,
        priceMax: null as string | number | null,
        cartList: [] as Product[],
        isClearFilter: false,
    }),
    actions: {
        setCategorySelected(category: Category | null) {
            if(category === null) {
                this.categorySelected = {
                    id: 0,
                    name: "Все категории",
                    image: null
                }
            } else {
                this.categorySelected = category; 
            }
            this.isClearFilter = false
        },
        setPriceMin(price: string | number | null) {
            this.priceMin = price
            this.isClearFilter = false
        },
        setPriceMax(price: string | number | null) {
            this.priceMax = price
            this.isClearFilter = false
        },
        clearFilter() {
            this.isClearFilter = true
            this.setCategorySelected(null)
            this.setPriceMin(null)
            this.setPriceMax(null)
        }
    },
});