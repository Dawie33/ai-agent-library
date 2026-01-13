<template>
  <BaseAgentExecutor :agent-name="agentName" result-type="code_analysis">
    <!-- Formulaire personnalisé -->
    <template #form="{ data, executing, updateData }">
      <div>
        <label for="prompt" class="block text-sm font-medium text-gray-700 mb-2">
          Code à analyser *
        </label>
        <div class="mb-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p class="text-sm text-purple-800">
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Fournissez le code source que vous souhaitez faire analyser. L'agent identifiera les problèmes, proposera des solutions et évaluera la qualité.
          </p>
        </div>
        <textarea
          id="prompt"
          :value="data"
          @input="updateData($event.target.value)"
          rows="15"
          required
          placeholder="Collez ici le code à analyser..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
          :disabled="executing"
        ></textarea>
      </div>

      <!-- Conseils d'utilisation -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p class="text-sm text-yellow-800 font-medium mb-1">💡 Conseils :</p>
        <ul class="text-xs text-yellow-700 list-disc list-inside space-y-1">
          <li>Incluez le contexte nécessaire (imports, types, etc.)</li>
          <li>Limitez-vous à une fonction ou un module à la fois pour une analyse plus précise</li>
          <li>Indiquez le langage si ce n'est pas évident (TypeScript, JavaScript, Python, etc.)</li>
        </ul>
      </div>
    </template>

    <!-- Affichage du résultat personnalisé -->
    <template #result="{ parsedResult }">
      <CodeAnalysisResult :analysis="parsedResult" />
    </template>
  </BaseAgentExecutor>
</template>

<script setup>
import BaseAgentExecutor from '../../pages/BaseAgentExecutor.vue'
import CodeAnalysisResult from '../results/CodeAnalysisResult.vue'

defineProps({
  agentName: {
    type: String,
    required: true
  }
})
</script>
