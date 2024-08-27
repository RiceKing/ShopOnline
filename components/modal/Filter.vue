<template>
    <div>
        <TransitionRoot as="template" :show="mobileFiltersOpen">
            <Dialog class="relative z-40 lg:hidden" @close="closeModal">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="translate-x-full">
                        <DialogPanel
                            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div class="flex items-center justify-between px-4">
                                <h2 class="text-lg font-medium text-gray-900">Фильтр</h2>
                                <button type="button"
                                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    @click="closeModal">
                                    <span class="sr-only">Закрыть</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>


                            <form class="mt-4 border-t border-gray-200">
                                <SectionsHomeAside />
                            </form>
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
    mobileFiltersOpen: boolean;
} 

const props = withDefaults(defineProps<Props>(), {
    mobileFiltersOpen: false
})

const emit = defineEmits<{
    (e: 'close'): void 
}>()

const closeModal = () => {
  emit('close');
};
</script>