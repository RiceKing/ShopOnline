<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">ShopOnline</h1>    
            <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в свой аккаунт</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="handleSubmit">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Почта</label>
                    <div class="mt-2">
                        <input id="email" v-model="email" required @blur="validateEmail" name="email" type="email"
                            autocomplete="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input id="password" name="password" v-model="password" type="password"
                            autocomplete="current-password" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Войти</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Укажите E-mail для входа в аккаунт или 
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">зарегистрируйтесь</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({middleware: ["auth"]})

const email = ref('')
const password = ref('')
const emailError = ref('')
const router = useRouter()

const auth = useAuthStore()

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    emailError.value = emailPattern.test(email.value) ? '' : 'Введите корректный email'
}

const handleSubmit = () => {
    validateEmail()
    if (!emailError.value && password.value) {
        auth.setAuthenticated(true)
        router.push('/')
    }
}
</script>

<style scoped></style>