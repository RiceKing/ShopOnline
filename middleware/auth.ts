import { useAuthStore } from '@/stores/auth';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
        if (to.path === '/cart' || to.path === '/') {
            return navigateTo('/login'); 
        }
    } else {
        if (to.path === '/login') {
            return navigateTo('/'); 
        }
    }
});