<template>
  <div class="p-6">

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <p>Chargement des agents...</p>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <!-- Liste des agents -->
    <div v-else class="grid gap-4">
      <div
        v-for="agent in agents"
        :key="agent.name"
        @click="() => $router.push(`/agent/${agent.name}`)"
        class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
      >
        <h2 class="text-xl font-bold mb-2">{{ agent.name }}</h2>
        <p class="text-gray-600 mb-4">{{ agent.description }}</p>
        <div class="flex gap-2">
          <span
            v-for="tag in agent.tags"
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mt-2">Version: {{ agent.version }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import agentApi from '../api/agentApi'
import { ref, onMounted } from 'vue'

// Variables réactives
const agents = ref([])
const loading = ref(false)
const error = ref(null)


// Charger les agents au montage du composant
onMounted(() => {
  loadAgents()
})
/**
 * Charge les agents enregistrés auprès de l'API
 *
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur se produit lors du chargement des agents
 */
async function loadAgents() {
  loading.value = true
  error.value = null

  try {
    // nestApi.get() retourne déjà le JSON parsé
    const data = await agentApi.get()
    agents.value = data.agents
    console.log('Agents chargés:', data)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    console.error('Erreur lors du chargement des agents:', err)
  } finally {
    loading.value = false
  }
}

</script>
