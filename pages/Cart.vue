<template>
    <div v-if="cartStore.totalCartProducts" class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Корзина</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border px-4 py-2">№</th>
                        <th class="border px-4 py-2">Наименование товара</th>
                        <th class="border px-4 py-2">Количество</th>
                        <th class="border px-4 py-2">Цена за ед.</th>
                        <th class="border px-4 py-2">Итого</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cartStore.cart" :key="item.id">
                        <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                        <td class="border px-4 py-2 text-center min-w-[300px]" >
                            <div class="flex items-center">
                                <img :src="item.images[0]" alt="Product Image" class="w-16 h-16 mr-2" />
                                {{ item.title }}
                            </div>

                            
                        </td>
                        <td class="border px-4 py-2 text-center min-w-[100px]">
                            <button @click="decrementItem(item)" class="bg-red-500 text-white px-2 rounded">-</button>
                            <span class="mx-2">{{ item.quantity }}</span>
                            <button @click="incrementItem(item)" class="bg-green-500 text-white px-2 rounded">+</button>
                        </td>
                        <td class="border px-4 py-2 text-center min-w-[100px]">{{ item.price.toFixed(2) }}&nbsp;₽</td>
                        <td class="border px-4 py-2 text-center min-w-[150px]">{{ (item.price * item.quantity).toFixed(2) }}&nbsp;₽</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4 flex justify-between">
            <h2 class="text-xl font-bold">Всего товаров {{ cartStore.totalCartProducts }} на сумму: {{ cartStore.totalProductsPrice }}&nbsp;₽</h2>
            <button @click="openModal" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Оформить заказ</button>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 class="text-2xl font-bold mb-4">Корзина пуста</h1>
            <p class="mb-6">Ваши товары будут здесь, когда вы их добавите.</p>
            <NuxtLink to="/" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Вернуться к покупкам
            </NuxtLink>
        </div>
    </div>
    <ModalSuccess :isOpen="isModalOpen" :title="`Заказ № 1`" message="Ваш заказ успешно оформлен" @close="closeModal" />
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({middleware: ["auth"]})

const cartStore = useCartStore();
const isModalOpen = ref(false)


const incrementItem = (item) => {
    cartStore.addProductToCart(item) 
}

const decrementItem = (item) => {
    cartStore.removeProductFromCart(item.id) 
}

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    const router = useRouter()

    isModalOpen.value = false
    cartStore.clearCart()
    
    router.push('/')
}
</script>