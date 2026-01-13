<template>
  <div class="space-y-6">
    <!-- Formulaire d'exécution -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Exécuter l'agent</h2>

      <form @submit.prevent="handleExecute" class="space-y-4">
        <!-- Slot pour le contenu du formulaire personnalisé -->
        <slot
          name="form"
          :data="data"
          :executing="executing"
          :update-data="updateData"
        ></slot>

        <!-- Boutons d'action -->
        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="executing || !canExecute"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="executing" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exécution en cours...
            </span>
            <span v-else>Exécuter</span>
          </button>
          <button
            type="button"
            @click="handleClear"
            :disabled="executing"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>

    <!-- Zone de résultats -->
    <div v-if="executionError || executionResult" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Résultat</h2>

      <!-- Erreur d'exécution -->
      <div v-if="executionError" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div>
            <p class="text-red-800 font-medium">Erreur lors de l'exécution</p>
            <p class="text-red-700 mt-1">{{ executionError }}</p>
          </div>
        </div>
      </div>

      <!-- Résultat réussi -->
      <div v-else-if="executionResult" class="space-y-4">
        <!-- Métadonnées -->
        <div class="flex items-center justify-between text-sm text-gray-600 pb-4 border-b">
          <div class="flex items-center gap-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ formatDate(executionResult.timestamp) }}
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {{ executionResult.executionTime }}ms
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleExportPdf"
              :disabled="exportingPdf"
              class="flex items-center text-purple-600 hover:text-purple-800 transition-colors disabled:opacity-50"
              :title="exportingPdf ? 'Export en cours...' : 'Exporter en PDF'"
            >
              <svg v-if="!exportingPdf" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ exportingPdf ? 'Export...' : 'PDF' }}
            </button>
            <button
              @click="handleCopy"
              class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              :class="{ 'text-green-600': copied }"
            >
              <svg v-if="!copied" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ copied ? 'Copié !' : 'Copier' }}
            </button>
          </div>
        </div>

        <!-- Slot pour le contenu du résultat personnalisé -->
        <div ref="resultContainer">
          <slot
            name="result"
            :result="executionResult"
            :parsed-result="parsedResult"
          >
            <!-- Affichage par défaut -->
            <div class="bg-gray-50 rounded-lg p-4">
              <pre class="whitespace-pre-wrap text-sm text-gray-800 font-mono">{{ executionResult.result }}</pre>
            </div>
          </slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import agentApi from '@/api/agentApi'
import { copyToClipboard, parseJsonField, formatDate } from '@/utils'
import { exportAgentResultToPdf } from '@/utils/pdfExport'

const props = defineProps({
  agentName: {
    type: String,
    required: true
  },
  resultType: {
    type: String,
    default: 'generic'
  },
  showAdvancedOptions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['executed', 'error', 'cleared'])

// Référence au conteneur du résultat
const resultContainer = ref(null)

// État du formulaire
const data = ref('')
const contextJson = ref('')
const optionsJson = ref('')
const contextError = ref(null)
const optionsError = ref(null)

// État de l'exécution
const executing = ref(false)
const executionResult = ref(null)
const executionError = ref(null)
const copied = ref(false)
const exportingPdf = ref(false)
const canExecute = computed(() => data.value.trim().length > 0)

/**
 * Résultat parsé (tentative de parse JSON, sinon retourne le texte brut)
 */
const parsedResult = computed(() => {
  if (!executionResult.value?.result) return null

  try {
    return JSON.parse(executionResult.value.result)
  } catch {
    return executionResult.value.result
  }
})

/**
 * Met à jour le data
 */
function updateData(value) {
  data.value = value
}

/**
 * Exécute l'agent
 */
async function handleExecute() {
  if (!canExecute.value) return

  // Valider les champs JSON
  const context = parseJsonField(contextJson.value, contextError)
  const options = parseJsonField(optionsJson.value, optionsError)

  if (context === undefined || options === undefined) {
    return
  }

  executing.value = true
  executionError.value = null
  executionResult.value = null

  try {
    const response = await agentApi.execute(props.agentName, {
      data: data.value,
      context: context || undefined,
      options: options || undefined,
    })

    if (response.success && response.result) {
      executionResult.value = response.result

      emit('executed', response.result)
    } else {
      executionError.value = response.error || 'Une erreur s\'est produite lors de l\'exécution'

      emit('error', executionError.value)
    }
  } catch (err) {
    executionError.value = err instanceof Error ? err.message : 'Erreur inconnue'
    console.error('Erreur lors de l\'exécution:', err)

    emit('error', executionError.value)
  } finally {
    executing.value = false
  }
}

/**
 * Réinitialise le formulaire
 */
function handleClear() {
  data.value = ''
  contextJson.value = ''
  optionsJson.value = ''
  contextError.value = null
  optionsError.value = null
  executionResult.value = null
  executionError.value = null
  copied.value = false

  emit('cleared')
}

/**
 * Copie le résultat
 */
async function handleCopy() {
  if (!executionResult.value) return

  try {
    await copyToClipboard(executionResult.value.result, copied)
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}

/**
 * Exporte le résultat en PDF
 */
async function handleExportPdf() {
  if (!executionResult.value || !resultContainer.value) return

  exportingPdf.value = true

  try {
    await exportAgentResultToPdf(
      resultContainer.value,
      props.agentName,
      props.resultType
    )
  } catch (err) {
    console.error('Erreur lors de l\'export PDF:', err)
    // Optionnel : afficher un message d'erreur à l'utilisateur
    executionError.value = 'Erreur lors de l\'export PDF : ' + (err instanceof Error ? err.message : 'Erreur inconnue')
  } finally {
    exportingPdf.value = false
  }
}

// Exposer les méthodes et états pour le composant parent
defineExpose({
  data,
  executing,
  executionResult,
  clear: handleClear,
  exportPdf: handleExportPdf
})
</script>

