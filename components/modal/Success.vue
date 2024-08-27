<template>
    <div>
        <TransitionRoot as="template" :show="isOpen">
            <Dialog class="relative z-40" @close="closeModal">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-40">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-y-full" enter-to="translate-y-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0"
                        leave-to="translate-y-full">
                        <DialogPanel
                            class="relative bg-white rounded-lg shadow-lg p-6 w-1/3">
                            <div class="flex items-center justify-between">
                                <h2 v-if="title" class="text-lg font-bold text-gray-900">{{ title }}</h2>
                                <button type="button"
                                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    @click="closeModal">
                                    <span class="sr-only">Закрыть</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div class="flex flex-col items-center justify-centerr gap-1 pt-4 mt-4 border-t border-gray-200">
                                <p class="text-lg text-center">{{ message }}</p>
                                <button type="button"
                                    class="bg-green-500 mt-4 text-white px-4 py-2 rounded hover:bg-green-600"
                                    @click="closeModal">
                                    <span>Закрыть</span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script lang="ts" setup>
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
    isOpen: boolean;
    title?: string,
    message?: string,
} 

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
})

const emit = defineEmits<{
    (e: 'close'): void 
}>()

const closeModal = () => {
  emit('close');
};
</script>