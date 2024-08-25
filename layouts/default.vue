<template>
    <div class="flex flex-col h-screen">
        <ComponentHeader />
        <main class="h-full container flex-grow mx-auto p-4">
            <slot />   
        </main>
    </div>
</template>

<style lang="scss" scoped>
</style>