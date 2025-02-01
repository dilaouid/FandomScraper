<script setup lang="ts">
defineProps<{
    src: string
    alt: string
    width?: number
    height?: number
}>()
</script>

<template>
    <img :src="src" :alt="alt" :width="width" :height="height" class="w-full h-auto object-cover" />
</template>