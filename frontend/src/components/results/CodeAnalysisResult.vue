<template>
  <div class="space-y-6">
    <!-- Résumé -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
        <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Résumé
      </h3>
      <p class="text-gray-700 leading-relaxed">{{ analysis.resume }}</p>
    </div>

    <!-- Compréhension -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Compréhension du code
      </h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-purple-50 rounded-lg p-4">
          <p class="text-sm font-medium text-purple-900 mb-1">Objectif</p>
          <p class="text-gray-700">{{ analysis.comprehension.objectif }}</p>
        </div>
        <div class="bg-purple-50 rounded-lg p-4">
          <p class="text-sm font-medium text-purple-900 mb-1">Technologie</p>
          <p class="text-gray-700">{{ analysis.comprehension.technologie }}</p>
        </div>
        <div class="bg-purple-50 rounded-lg p-4">
          <p class="text-sm font-medium text-purple-900 mb-1">Type</p>
          <p class="text-gray-700">{{ analysis.comprehension.type }}</p>
        </div>
      </div>
    </div>

    <!-- Évaluation -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Évaluation
      </h3>

      <!-- Score -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Score global</span>
          <span class="text-2xl font-bold" :class="getScoreColor(analysis.evaluation.score)">
            {{ analysis.evaluation.score }}/10
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            class="h-3 rounded-full transition-all duration-500"
            :class="getScoreBarColor(analysis.evaluation.score)"
            :style="{ width: `${analysis.evaluation.score * 10}%` }"
          ></div>
        </div>
      </div>

      <!-- Points forts -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          Points forts
        </h4>
        <ul class="space-y-2">
          <li
            v-for="(point, index) in analysis.evaluation.pointsForts"
            :key="index"
            class="flex items-start text-sm text-gray-700"
          >
            <span class="text-green-600 mr-2">✓</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>

      <!-- Axes de progression -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-1 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Axes de progression
        </h4>
        <ul class="space-y-2">
          <li
            v-for="(axe, index) in analysis.evaluation.axesProgression"
            :key="index"
            class="flex items-start text-sm text-gray-700"
          >
            <span class="text-orange-600 mr-2">→</span>
            <span>{{ axe }}</span>
          </li>
        </ul>
      </div>

      <!-- Conseil mentorat -->
      <div class="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
        <p class="text-sm font-medium text-blue-900 mb-1">Conseil du mentor</p>
        <p class="text-sm text-gray-700">{{ analysis.evaluation.conseilMentorat }}</p>
      </div>

      <!-- Ressources -->
      <div v-if="analysis.evaluation.ressources && analysis.evaluation.ressources.length > 0" class="mt-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          Ressources utiles
        </h4>
        <ul class="space-y-1">
          <li v-for="(ressource, index) in analysis.evaluation.ressources" :key="index">
            <a
              :href="ressource"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
            >
              {{ ressource }}
              <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Problèmes -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Problèmes détectés
      </h3>

      <!-- Problèmes critiques -->
      <div v-if="analysis.problemes.critiques && analysis.problemes.critiques.length > 0" class="mb-6">
        <h4 class="text-sm font-semibold text-red-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
          Critiques ({{ analysis.problemes.critiques.length }})
        </h4>
        <div class="space-y-3">
          <div
            v-for="(probleme, index) in analysis.problemes.critiques"
            :key="index"
            class="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <h5 class="font-semibold text-red-900">{{ probleme.titre }}</h5>
              <span class="px-2 py-1 bg-red-600 text-white text-xs rounded-full">{{ probleme.priorite }}</span>
            </div>
            <p class="text-sm text-gray-700 mb-2">{{ probleme.description }}</p>
            <div class="grid md:grid-cols-2 gap-2 text-xs">
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Impact:</span>
                <span class="text-gray-700 ml-1">{{ probleme.impact }}</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Localisation:</span>
                <span class="text-gray-700 ml-1">{{ probleme.localisation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Problèmes importants -->
      <div v-if="analysis.problemes.importants && analysis.problemes.importants.length > 0" class="mb-6">
        <h4 class="text-sm font-semibold text-orange-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Importants ({{ analysis.problemes.importants.length }})
        </h4>
        <div class="space-y-3">
          <div
            v-for="(probleme, index) in analysis.problemes.importants"
            :key="index"
            class="bg-orange-50 border border-orange-200 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <h5 class="font-semibold text-orange-900">{{ probleme.titre }}</h5>
              <span class="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">{{ probleme.priorite }}</span>
            </div>
            <p class="text-sm text-gray-700 mb-2">{{ probleme.description }}</p>
            <div class="grid md:grid-cols-2 gap-2 text-xs">
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Impact:</span>
                <span class="text-gray-700 ml-1">{{ probleme.impact }}</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Localisation:</span>
                <span class="text-gray-700 ml-1">{{ probleme.localisation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Problèmes mineurs -->
      <div v-if="analysis.problemes.mineurs && analysis.problemes.mineurs.length > 0">
        <h4 class="text-sm font-semibold text-yellow-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Mineurs ({{ analysis.problemes.mineurs.length }})
        </h4>
        <div class="space-y-3">
          <div
            v-for="(probleme, index) in analysis.problemes.mineurs"
            :key="index"
            class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <h5 class="font-semibold text-yellow-900">{{ probleme.titre }}</h5>
              <span class="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">{{ probleme.priorite }}</span>
            </div>
            <p class="text-sm text-gray-700 mb-2">{{ probleme.description }}</p>
            <div class="grid md:grid-cols-2 gap-2 text-xs">
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Impact:</span>
                <span class="text-gray-700 ml-1">{{ probleme.impact }}</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="font-medium text-gray-900">Localisation:</span>
                <span class="text-gray-700 ml-1">{{ probleme.localisation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucun problème -->
      <div v-if="!hasProblems" class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-600">Aucun problème détecté</p>
      </div>
    </div>

    <!-- Solutions -->
    <div v-if="analysis.solutions && analysis.solutions.length > 0" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Solutions proposées
      </h3>
      <div class="space-y-6">
        <div
          v-for="(solution, index) in analysis.solutions"
          :key="index"
          class="border border-gray-200 rounded-lg p-5"
        >
          <h4 class="font-semibold text-gray-900 mb-2">{{ solution.probleme }}</h4>
          <p class="text-sm text-gray-700 mb-3">{{ solution.solution }}</p>

          <div class="bg-blue-50 border-l-4 border-blue-500 rounded p-3 mb-4">
            <p class="text-sm font-medium text-blue-900 mb-1">Pourquoi cette solution ?</p>
            <p class="text-sm text-gray-700">{{ solution.pourquoi }}</p>
          </div>

          <!-- Comparaison avant/après -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <div class="flex items-center mb-2">
                <svg class="w-4 h-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-semibold text-gray-900">Avant</span>
              </div>
              <pre class="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto"><code>{{ solution.codeAvant }}</code></pre>
            </div>
            <div>
              <div class="flex items-center mb-2">
                <svg class="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-semibold text-gray-900">Après</span>
              </div>
              <pre class="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto"><code>{{ solution.codeApres }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Plan d'action -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Plan d'action
      </h3>

      <div class="space-y-4">
        <!-- Urgent -->
        <div v-if="analysis.planAction.urgent && analysis.planAction.urgent.length > 0">
          <h4 class="text-sm font-semibold text-red-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            À faire en urgence
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in analysis.planAction.urgent"
              :key="index"
              class="flex items-start text-sm"
            >
              <input type="checkbox" class="mt-1 mr-3" />
              <span class="text-gray-700">{{ action }}</span>
            </li>
          </ul>
        </div>

        <!-- Important -->
        <div v-if="analysis.planAction.important && analysis.planAction.important.length > 0">
          <h4 class="text-sm font-semibold text-orange-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Important
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in analysis.planAction.important"
              :key="index"
              class="flex items-start text-sm"
            >
              <input type="checkbox" class="mt-1 mr-3" />
              <span class="text-gray-700">{{ action }}</span>
            </li>
          </ul>
        </div>

        <!-- Bonus -->
        <div v-if="analysis.planAction.bonus && analysis.planAction.bonus.length > 0">
          <h4 class="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Bonus
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in analysis.planAction.bonus"
              :key="index"
              class="flex items-start text-sm"
            >
              <input type="checkbox" class="mt-1 mr-3" />
              <span class="text-gray-700">{{ action }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  analysis: {
    type: Object,
    required: true
  }
})

/**
 * Vérifie s'il y a des problèmes
 */
const hasProblems = computed(() => {
  return (
    (props.analysis.problemes.critiques && props.analysis.problemes.critiques.length > 0) ||
    (props.analysis.problemes.importants && props.analysis.problemes.importants.length > 0) ||
    (props.analysis.problemes.mineurs && props.analysis.problemes.mineurs.length > 0)
  )
})

/**
 * Retourne la couleur du score
 */
function getScoreColor(score) {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-orange-600'
  return 'text-red-600'
}

/**
 * Retourne la couleur de la barre de progression
 */
function getScoreBarColor(score) {
  if (score >= 8) return 'bg-green-500'
  if (score >= 6) return 'bg-orange-500'
  return 'bg-red-500'
}
</script>
