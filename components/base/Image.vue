<template>
    <div class="relative">
        <img 
            v-if="imageLoaded" 
            :src="src" 
            itemprop="image"
            :alt="alt" 
            class="w-full h-auto object-cover object-center" 
        />
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

interface Props {
    image?: string, 
    images?: string[],
    alt?: string
}

const props = withDefaults(defineProps<Props>(), {
    images: () => [], 
    image: '',
    alt: ''
})

const imageLoaded = ref<boolean>(false);
const src = ref('');

onMounted(() => {
    if(props.images.length) src.value = props.images[0];
    else src.value = props.image; 

    imageLoaded.value = true
})


</script>

<style scoped>

</style>