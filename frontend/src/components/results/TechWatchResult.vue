<template>
  <div class="space-y-6">
    <!-- En-tête avec résumé -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Résumé de la veille
      </h3>
      <p class="text-gray-700 leading-relaxed">{{ techWatch.resume }}</p>
    </div>

    <!-- Contexte de recherche -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Contexte de recherche
      </h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-blue-50 rounded-lg p-4">
          <p class="text-sm font-medium text-blue-900 mb-1">Domaine</p>
          <p class="text-gray-700">{{ techWatch.contexte.domaine }}</p>
        </div>
        <div class="bg-blue-50 rounded-lg p-4">
          <p class="text-sm font-medium text-blue-900 mb-1">Période</p>
          <p class="text-gray-700">{{ techWatch.contexte.periode }}</p>
        </div>
        <div class="bg-blue-50 rounded-lg p-4">
          <p class="text-sm font-medium text-blue-900 mb-1">Sources</p>
          <p class="text-gray-700">{{ techWatch.contexte.nombreSources }} sources analysées</p>
        </div>
      </div>
    </div>

    <!-- Tendances principales -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Tendances principales
      </h3>
      <div class="space-y-4">
        <div
          v-for="(tendance, index) in techWatch.tendances"
          :key="index"
          class="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <h4 class="text-lg font-semibold text-gray-900 flex-1">{{ tendance.titre }}</h4>
            <span
              class="px-3 py-1 rounded-full text-xs font-medium ml-3"
              :class="getImpactClass(tendance.impact)"
            >
              {{ tendance.impact }}
            </span>
          </div>
          <p class="text-gray-700 mb-4">{{ tendance.description }}</p>

          <!-- Technologies associées -->
          <div class="mb-3">
            <p class="text-sm font-medium text-gray-900 mb-2">Technologies :</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, techIndex) in tendance.technologies"
                :key="techIndex"
                class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Sources -->
          <div v-if="tendance.sources && tendance.sources.length > 0">
            <p class="text-sm font-medium text-gray-900 mb-2">Sources :</p>
            <ul class="space-y-1">
              <li v-for="(source, srcIndex) in tendance.sources" :key="srcIndex">
                <a
                  :href="source.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  {{ source.titre }}
                  <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Innovations et nouveautés -->
    <div v-if="techWatch.innovations && techWatch.innovations.length > 0" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Innovations & Nouveautés
      </h3>
      <div class="space-y-4">
        <div
          v-for="(innovation, index) in techWatch.innovations"
          :key="index"
          class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <h4 class="font-semibold text-gray-900 mb-2">{{ innovation.titre }}</h4>
          <p class="text-sm text-gray-700 mb-3">{{ innovation.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-600">
            <span>{{ innovation.date }}</span>
            <a
              v-if="innovation.lien"
              :href="innovation.lien"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 hover:underline"
            >
              En savoir plus →
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Outils et ressources recommandés -->
    <div v-if="techWatch.outils && techWatch.outils.length > 0" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Outils & Ressources recommandés
      </h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="(outil, index) in techWatch.outils"
          :key="index"
          class="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
        >
          <h4 class="font-semibold text-gray-900 mb-2">{{ outil.nom }}</h4>
          <p class="text-sm text-gray-700 mb-3">{{ outil.description }}</p>
          <div class="flex items-center justify-between">
            <span
              class="px-2 py-1 text-xs rounded-full"
              :class="getCategoryClass(outil.categorie)"
            >
              {{ outil.categorie }}
            </span>
            <a
              v-if="outil.lien"
              :href="outil.lien"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Visiter →
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommandations -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Recommandations d'action
      </h3>

      <div class="space-y-4">
        <!-- À court terme -->
        <div v-if="techWatch.recommandations.courtTerme && techWatch.recommandations.courtTerme.length > 0">
          <h4 class="text-sm font-semibold text-red-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            À court terme (0-3 mois)
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in techWatch.recommandations.courtTerme"
              :key="index"
              class="flex items-start text-sm"
            >
              <input type="checkbox" class="mt-1 mr-3" />
              <span class="text-gray-700">{{ action }}</span>
            </li>
          </ul>
        </div>

        <!-- À moyen terme -->
        <div v-if="techWatch.recommandations.moyenTerme && techWatch.recommandations.moyenTerme.length > 0">
          <h4 class="text-sm font-semibold text-orange-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            À moyen terme (3-6 mois)
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in techWatch.recommandations.moyenTerme"
              :key="index"
              class="flex items-start text-sm"
            >
              <input type="checkbox" class="mt-1 mr-3" />
              <span class="text-gray-700">{{ action }}</span>
            </li>
          </ul>
        </div>

        <!-- À surveiller -->
        <div v-if="techWatch.recommandations.aSurveiller && techWatch.recommandations.aSurveiller.length > 0">
          <h4 class="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            À surveiller
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(action, index) in techWatch.recommandations.aSurveiller"
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

    <!-- Synthèse et perspectives -->
    <div v-if="techWatch.perspectives" class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Perspectives
      </h3>
      <p class="text-gray-700 leading-relaxed">{{ techWatch.perspectives }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  techWatch: {
    type: Object,
    required: true
  }
})

/**
 * Retourne la classe CSS selon l'impact
 */
function getImpactClass(impact) {
  const impactLower = impact.toLowerCase()
  if (impactLower.includes('élevé') || impactLower.includes('fort')) {
    return 'bg-red-100 text-red-800'
  }
  if (impactLower.includes('moyen')) {
    return 'bg-orange-100 text-orange-800'
  }
  return 'bg-blue-100 text-blue-800'
}

/**
 * Retourne la classe CSS selon la catégorie
 */
function getCategoryClass(categorie) {
  const categorieLower = categorie.toLowerCase()
  if (categorieLower.includes('framework')) {
    return 'bg-purple-100 text-purple-800'
  }
  if (categorieLower.includes('bibliothèque') || categorieLower.includes('library')) {
    return 'bg-blue-100 text-blue-800'
  }
  if (categorieLower.includes('outil')) {
    return 'bg-green-100 text-green-800'
  }
  return 'bg-gray-100 text-gray-800'
}
</script>
