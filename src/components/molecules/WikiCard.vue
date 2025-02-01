<script setup lang="ts">
import AppImage from '../atoms/AppImage.vue'
import type { Wiki } from '@/types'

interface Props {
    wiki: Wiki
    isSelected: boolean
}

defineProps<Props>()

defineEmits<{
    (e: 'select', wiki: Wiki): void
}>()
</script>

<template>
    <div class="relative group cursor-pointer" :class="{ 'scale-out': isSelected }" @click="$emit('select', wiki)">
        <div
            class="relative overflow-hidden rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
            <AppImage :src="wiki.imageUrl" :alt="wiki.name" :width="500" :height="750" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 w-full p-6">
                    <h2 class="text-white text-2xl font-bold">{{ wiki.name }}</h2>
                    <p class="text-white/80 mt-2">Explorer les personnages →</p>
                </div>
            </div>
        </div>
    </div>
</template>