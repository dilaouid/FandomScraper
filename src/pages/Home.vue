<!-- src/pages/HomePage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WikiGrid from '../components/organisms/WikiGrid.vue'
import PageLayout from '../components/templates/PageLayout.vue'
import LoadingSpinner from '../components/molecules/LoadingSpinner.vue'
import { useWikis } from '../composables/useWikis'
import type { Wiki } from '../types'

const router = useRouter()
const selectedWikiId = ref<string | null>(null)


const {
    data: wikis,
    isLoading,
    isError,
    error
} = useWikis()
console.log(wikis);


const handleWikiSelect = (wiki: Wiki) => {
    selectedWikiId.value = wiki.id
    setTimeout(() => {
        router.push(`/${wiki.id}/characters`)
    }, 500)
}
</script>

<template>
    <PageLayout>
        <template #background>
            <div class="absolute inset-0 bg-anime-pattern" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </template>

        <div v-if="isError" class="text-red-500 text-center py-8">
            Une erreur est survenue lors du chargement des wikis.
            <p v-if="error" class="text-sm mt-2">{{ error.message }}</p>
        </div>

        <div v-else-if="isLoading" class="flex justify-center py-8">
            <LoadingSpinner />
        </div>

        <div v-else class="container mx-auto px-4 py-12">
            <WikiGrid :wikis="wikis || []" :selected-wiki-id="selectedWikiId" @select="handleWikiSelect" />
        </div>
    </PageLayout>
</template>

<style>
.bg-anime-pattern {
    background: linear-gradient(45deg, #1a1a2e 25%, transparent 25%) -50px 0,
        linear-gradient(-45deg, #1a1a2e 25%, transparent 25%) -50px 0,
        linear-gradient(45deg, transparent 75%, #1a1a2e 75%) -50px 0,
        linear-gradient(-45deg, transparent 75%, #1a1a2e 75%) -50px 0;
    background-size: 100px 100px;
    animation: patternMove 20s linear infinite;
}

@keyframes patternMove {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100px 100px;
    }
}

.scale-out {
    transform: scale(0.8);
    opacity: 0.5;
    filter: blur(2px);
    transition: all 0.5s ease-in-out;
}
</style>
