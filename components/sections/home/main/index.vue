<template>
    <section class="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 class="mt-2 text-3xl font-bold mb-4 tracking-tight text-gray-900 sm:text-4xl">{{headerTitle}}</h2>
        <div v-if="products.length" class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <SectionsHomeMainUiProduct v-for="product in products" :key="product.id" :product="product" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Product, Category } from "@/types/product";

interface Props {
    products: Product[],
    categorySelected: Category | null
}

const props = withDefaults(defineProps<Props>(), {
    products: () => [],
})

const headerTitle = computed(() => {
    if(!props.categorySelected?.name) return 'Загрузка...';
    if(!props.products.length) return 'Пока что здесь пусто. Попробуйте другие настройки фильтра :)';
    if(props.categorySelected?.name) return props.categorySelected.name;
})
</script>