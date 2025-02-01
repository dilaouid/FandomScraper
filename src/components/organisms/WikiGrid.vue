<script setup lang="ts">
import WikiCard from '../molecules/WikiCard.vue'
import type { Wiki } from '@/types'

interface Props {
    wikis: Wiki[]
    selectedWikiId: string | null
}

defineProps<Props>()

defineEmits<{
    (e: 'select', wiki: Wiki): void
}>()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <WikiCard v-for="wiki in wikis" :key="wiki.id" :wiki="wiki"
            :is-selected="selectedWikiId && selectedWikiId !== wiki.id" @select="$emit('select', wiki)" />
    </div>
</template>