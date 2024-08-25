<template>
    <div v-if="product" class="group flex flex-col h-full" itemscope itemtype="http://schema.org/Product">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <BaseImage  :images="product.images" :alt="product.title" class="h-full w-full group-hover:opacity-75 image-wrap" />
        </div>
        <h3 itemprop="name" class="title mt-4 text-sm text-gray-700 line-clamp-2">{{ product.title }}</h3>
        
        <p class="mt-1 text-lg font-medium text-gray-900" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <span itemprop="price" content="">{{ product.price }}</span>
            <span itemprop="priceCurrency" content="RUB"> ₽</span>
        </p>

        <button @click="buyProduct" class="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
            В корзину
        </button>
        <meta itemprop="availability" content="http://schema.org/InStock" />
    </div>
</template>
  
<script lang="ts" setup>
import type { Product } from "@/types/product";

interface Props {
    product: Product | null
}

const props = withDefaults(defineProps<Props>(), {
    product: null
})

const buyProduct = () => {
    console.log('buyProduct')
}

</script>

<style scoped>
.title {
    min-height: 40px;
}

.image-wrap {
    min-height: 192px;
}
</style>