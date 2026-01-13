<template>
  <BaseAgentExecutor :agent-name="agentName" result-type="tech_watch">
    <!-- Formulaire personnalisé -->
    <template #form="{ data, executing, updateData }">
      <div>
        <label for="prompt" class="block text-sm font-medium text-gray-700 mb-2">
          Sujet de veille *
        </label>
        <div class="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm text-blue-800">
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Spécifiez le domaine technologique ou la technologie spécifique que vous souhaitez surveiller. Le prompt système complet est déjà configuré côté backend.
          </p>
        </div>
        <textarea
          id="prompt"
          :value="data"
          @input="updateData($event.target.value)"
          rows="3"
          required
          placeholder="Ex: Next.js 15 et nouvelles fonctionnalités&#10;Ex: État de l'art des ORMs TypeScript en 2025&#10;Ex: Tendances architecture frontend 2025"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          :disabled="executing"
        ></textarea>
      </div>

    </template>

    <!-- Affichage du résultat personnalisé -->
    <template #result="{ parsedResult }">
      <TechWatchResult :techWatch="parsedResult" />
    </template>
  </BaseAgentExecutor>
</template>

<script setup>
import BaseAgentExecutor from '../../pages/BaseAgentExecutor.vue'
import TechWatchResult from '../results/TechWatchResult.vue'

defineProps({
  agentName: {
    type: String,
    required: true
  }
})

</script>
