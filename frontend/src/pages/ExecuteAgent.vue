<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Bouton retour -->
    <button
      @click="$router.push('/dashboard')"
      class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour au Dashboard
    </button>

    <!-- Loading agent details -->
    <div v-if="loadingAgent" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Chargement de l'agent...</p>
    </div>

    <!-- Error loading agent -->
    <div v-else-if="loadError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p class="text-red-700">{{ loadError }}</p>
    </div>

    <!-- Agent interface -->
    <div v-else-if="agent">
      <!-- En-tête de l'agent -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ agent.name }}</h1>
        <p class="text-gray-600 mb-4">{{ agent.description }}</p>
        <div class="flex gap-2 mb-3">
          <span
            v-for="tag in agent.tags"
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
        <div class="text-sm text-gray-500">
          <span class="mr-4">Version: {{ agent.version }}</span>
          <span v-if="agent.author">Auteur: {{ agent.author }}</span>
        </div>
      </div>

      <!-- Composant d'exécution spécialisé -->
      <component :is="executorComponent" :agent-name="agentName" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import agentApi from '../api/agentApi'
import TechWatchExecutor from '../components/executors/TechWatchExecutor.vue'
import CodeReviewExecutor from '../components/executors/CodeReviewExecutor.vue'
import BaseAgentExecutor from '../components/executors/BaseAgentExecutor.vue'

const route = useRoute()
const agentName = route.params.name

// État de l'agent
const agent = ref(null)
const loadingAgent = ref(false)
const loadError = ref(null)

/**
 * Sélectionne le composant d'exécution approprié selon le type d'agent
 */
const executorComponent = computed(() => {
  if (!agent.value) return BaseAgentExecutor

  const name = agent.value.name.toLowerCase()

  // Agent de veille technologique
  if (name.includes('watch') || name.includes('veille')) {
    return TechWatchExecutor
  }

  // Agent de revue de code
  if (name.includes('review') || name.includes('code')) {
    return CodeReviewExecutor
  }

  // Composant générique par défaut
  return BaseAgentExecutor
})

/**
 * Charge les détails de l'agent
 */
async function loadAgent() {
  loadingAgent.value = true
  loadError.value = null

  try {
    const data = await agentApi.getDetails(agentName)
    agent.value = data.config
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Erreur lors du chargement de l\'agent'
    console.error('Erreur lors du chargement de l\'agent:', err)
  } finally {
    loadingAgent.value = false
  }
}

// Charger l'agent au montage du composant
onMounted(() => {
  loadAgent()
})
</script>
