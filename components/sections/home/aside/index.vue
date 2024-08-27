<template>
    <aside class="border-r h-full  pr-4 pl-4 lg:pl-0">
        <div class="gap-4 flex flex-col">
            <h2 class="text-lg font-semibold mb-4">Фильтр</h2>
            <SectionsHomeAsideUiCategory :categories="categories" />
            <div>
                <label for="price_min" class="block text-sm font-medium leading-6 text-gray-900">Минимальная цена:</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-gray-500 sm:text-sm">₽</span>
                </div>
                <input type="number" v-model="shopStore.priceMin" name="price_min" id="price_min" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
                </div>
            </div>

            <div>
                <label for="price_max" class="block text-sm font-medium leading-6 text-gray-900">Максимальная цена:</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-gray-500 sm:text-sm">₽</span>
                </div>
                <input type="number" :min="shopStore.priceMin || 0" v-model="shopStore.priceMax" name="price_max" id="price_max" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
                </div>
            </div>

            <button type="reset" class="bg-gray-300 p-2 rounded">Сбросить фильтры</button>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded mb-2">Применить</button>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import type { Category } from '@/types/product';

interface Props {
    categories: Category[],
    categorySelected: Category | null,
    isClearFilter: boolean
}
const props = withDefaults(defineProps<Props>(), {
    categories: () => []
})

const shopStore = useShopStore()

onMounted(() => {
    shopStore.clearFilter()
})

const updatePriceMin = (event: any) => {
    shopStore.setPriceMin(event.target.value)
};

const updatePriceMax = (event: any) => {
    const newValue = event.target.value
    if(newValue && shopStore.priceMin) {
        if(newValue >= shopStore.priceMin) shopStore.setPriceMax(newValue); 
    }
};
</script>