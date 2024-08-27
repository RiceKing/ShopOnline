<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl">
            <div class="flex items-baseline justify-end border-b border-gray-200 pb-6 lg:hidden">
                <div class="flex items-center">
                    <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
                        @click="mobileFiltersOpen = true">
                        <span class="sr-only">Категории</span>
                        <FunnelIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <section aria-labelledby="products-heading" class="pb-24 pt-6">
                <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form @reset.prevent="handleResetFilter" @submit.prevent="submitFilter" class="hidden lg:block">
                        <SectionsHomeAside class="sticky top-[60px]" :categories="categories" :categorySelected="categorySelected" />
                    </form>

                    <div class="lg:col-span-3">
                        <SectionsHomeMain :products="products" :categorySelected="categorySelected" />
                    </div>
                </div>
            </section>
        </div>
        <ModalFilter :mobileFiltersOpen="mobileFiltersOpen" @close="mobileFiltersOpen = false" />
    </div>
</template>

<script lang="ts" setup>
import { FunnelIcon } from '@heroicons/vue/20/solid'
import { fetchProducts, fetchCategories } from '@/services/productService';
import type { Product, Category, QueryProducts } from '@/types/product';

definePageMeta({middleware: ["auth"]})

const mobileFiltersOpen = ref(false)

const products = ref<Product[]>([])
const categories = ref<Category[]>([])

const error = ref<string>('')
const categorySelected = ref<Category | null>(null)

const route = useRoute() 

const { params, query } = useRoute();
const shopStore = useShopStore()


const queryProducts = ref<QueryProducts>({
    priceMin: query.price_min || undefined, 
    priceMax: query.price_max || undefined,  
    categoryId: query.categoryId || shopStore.categorySelected?.id || undefined
})

const loadData = async () => {
    try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([fetchProducts(queryProducts.value), fetchCategories()])

        products.value = fetchedProducts
        categories.value = addStartOptionCategory(fetchedCategories)
        categorySelected.value = categories.value.find(item => item.id === queryProducts.value.categoryId) || categories.value[0]

        shopStore.setCategorySelected(categorySelected.value)
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message
        } else {
            error.value = 'Неизвестная ошибка'
        }

        console.log(error.value)
    }
}

const updateProducts = async () => {
    try {
        const fetchedProducts = await fetchProducts(queryProducts.value)
        products.value = fetchedProducts
        categorySelected.value = categories.value.find(item => item.id === queryProducts.value.categoryId) || categories.value[0]
        shopStore.setCategorySelected(categorySelected.value)
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message
        } else {
            error.value = 'Неизвестная ошибка'
        }

        console.log(error.value)
    }
}

const addStartOptionCategory = (fetchedCategories: Category[]): Category[] => {
    const defaultOption: Category = {
        id: 0,
        name: "Все категории",
        image: null
    }

    return [defaultOption, ...fetchedCategories]
}

const handleResetFilter = () => {
    shopStore.clearFilter()
    submitFilter()
}

const submitFilter = () => {
    queryProducts.value.categoryId = shopStore.categorySelected?.id || undefined
    queryProducts.value.priceMin = shopStore.priceMin || undefined
    queryProducts.value.priceMax = shopStore.priceMax || undefined

    updateProducts()
    
}

onMounted(loadData);
</script>