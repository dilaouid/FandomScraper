<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";

interface AnimeCard {
    id: string;
    name: string;
    imageUrl: string;
}

const COVER_SIZE = {
    width: 500,
    height: 750,
};

const router = useRouter();
const selectedCard = ref<string | null>(null);

const { data: wikis } = useQuery({
    queryKey: ["wikis"],
    queryFn: () => fetch("/api/available-wikis").then((res) => res.json()),
});

const cards = computed(
    () =>
        wikis.value?.map((wiki) => ({
            id: wiki,
            name: wiki
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
            imageUrl: `/src/assets/${wiki}.jpg`,
        })) ?? []
);

const navigateToWiki = (wiki: string) => {
    selectedCard.value = wiki;
    setTimeout(() => {
        router.push(`/${wiki}/characters`);
    }, 500);
};
</script>

<template>
    <div class="relative min-h-screen overflow-hidden">
        <!-- Background animé -->
        <div class="absolute inset-0 bg-anime-pattern"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

        <!-- Grille de covers -->
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="card in cards" :key="card.id" class="relative group"
                    :class="{ 'scale-out': selectedCard && selectedCard !== card.id }" @click="navigateToWiki(card.id)">
                    <div
                        class="relative overflow-hidden rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                        <img :src="card.imageUrl" :alt="card.name" :width="COVER_SIZE.width" :height="COVER_SIZE.height"
                            class="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-0 w-full p-6">
                                <h2 class="text-white text-2xl font-bold">{{ card.name }}</h2>
                                <p class="text-white/80 mt-2">Explorer les personnages →</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-anime-pattern {
    background:
        linear-gradient(45deg, #1a1a2e 25%, transparent 25%) -50px 0,
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
