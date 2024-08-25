<template>
    <header class="bg-white shadow">
    <div class="container mx-auto flex justify-between items-center p-4">
        <NuxtLink href="/" class="flex items-center">
            <span class="text-xl font-bold">ShopOnline</span>
        </NuxtLink>

        <div class="relative">
            <NuxtLink href="/cart" class="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <ShoppingCartIcon class="h-5 w-5 mr-2" />
                Корзина
            </NuxtLink>
            <span v-if="itemCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
            </span>
      </div>
    </div>
    </header>
</template>
  
<script lang="ts" setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';

const itemCount = ref(0)
</script>