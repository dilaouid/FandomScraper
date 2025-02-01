<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="relative min-h-screen overflow-hidden">
        <!-- Background slot -->
        <slot name="background" />

        <!-- Header/Navigation -->
        <header class="relative z-10">
            <nav class="container mx-auto px-4 py-6">
                <button v-if="router.currentRoute.value.path !== '/'" @click="router.back()"
                    class="text-white hover:text-white/80 transition-colors">
                    ← Retour
                </button>
            </nav>
        </header>

        <!-- Main content -->
        <main class="relative z-10">
            <slot />
        </main>
    </div>
</template>