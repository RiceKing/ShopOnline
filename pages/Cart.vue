<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Корзина</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border px-4 py-2">#</th>
                        <th class="border px-4 py-2">Наименование товара</th>
                        <th class="border px-4 py-2">Количество</th>
                        <th class="border px-4 py-2">Цена за единицу</th>
                        <th class="border px-4 py-2">Общая цена</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cartItems" :key="item.id">
                        <td class="border px-4 py-2">{{ index + 1 }}</td>
                        <td class="border px-4 py-2 flex items-center">
                            <img :src="item.image" alt="Product Image" class="w-16 h-16 mr-2" />
                            {{ item.name }}
                        </td>
                        <td class="border px-4 py-2 flex items-center">
                            <button @click="decrementItem(item)" class="bg-red-500 text-white px-2 rounded">-</button>
                            <span class="mx-2">{{ item.quantity }}</span>
                            <button @click="incrementItem(item)" class="bg-green-500 text-white px-2 rounded">+</button>
                        </td>
                        <td class="border px-4 py-2">{{ item.price.toFixed(2) }} ₽</td>
                        <td class="border px-4 py-2">{{ (item.price * item.quantity).toFixed(2) }} ₽</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4">
            <h2 class="text-xl font-bold">Итоговая цена: {{ totalPrice.toFixed(2) }} ₽</h2>
            <button @click="openModal" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Оформить заказ</button>
        </div>
    </div>

</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
    { id: 1, name: 'Товар 1', image: 'https://via.placeholder.com/150', price: 100, quantity: 1 },
    { id: 2, name: 'Товар 2', image: 'https://via.placeholder.com/150', price: 200, quantity: 2 },
])

const isModalOpen = ref(false)

const itemCount = computed(() => cartItems.value.reduce((acc, item) => acc + item.quantity, 0))

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0))

const incrementItem = (item) => {
    item.quantity++
}

const decrementItem = (item) => {
    if (item.quantity > 1) {
        item.quantity--
    } else {
        cartItems.value = cartItems.value.filter(i => i.id !== item.id)
    }
}

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    clearCart()
}

const clearCart = () => {
    cartItems.value = []
}
</script>