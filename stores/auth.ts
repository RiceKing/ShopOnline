export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false, 
    }),
    actions: {
        setAuthenticated(value: boolean) {
            this.isAuthenticated = value;
        },
    },
});