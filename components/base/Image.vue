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


const loadFirstAvailableImage = async (urls: Props["images"]): Promise<string> => {
    if(!urls) return '';
    
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Image not available');
            }

            return url
        } catch (error) {
            if(error instanceof Error) console.error(`Ошибка загрузки изображения ${url}: ${error.message}`);
        }
    }

    return '';
};

onMounted(() => {
    if(props.images.length) loadFirstAvailableImage(props.images).then(availableImage => {
        if (availableImage) src.value = availableImage;
        else src.value = props.image;

        imageLoaded.value = true
    }) 
    else {
        src.value = props.image; 
        imageLoaded.value = true;
    }
})


</script>

<style scoped>

</style>