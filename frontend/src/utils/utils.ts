/**
 * Fonctions utilitaires générales
 */

import type { Ref } from 'vue'
import { format, parseISO, isValid } from 'date-fns'
import { fr } from 'date-fns/locale'


/**
 * Copie du texte dans le presse-papiers
 *
 * @param text - Texte à copier
 * @param copiedRef - Référence réactive pour indiquer l'état de la copie
 * @param duration - Durée d'affichage de la confirmation (en ms, défaut: 2000)
 * @returns Promise résolue quand la copie est terminée
 *
 * @example
 * const copied = ref(false)
 * await copyToClipboard('Texte à copier', copied)
 */
export async function copyToClipboard(
  text: string,
  copiedRef?: Ref<boolean>,
  duration: number = 2000
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)

    if (copiedRef) {
      copiedRef.value = true
      setTimeout(() => {
        copiedRef.value = false
      }, duration)
    }
  } catch (error) {
    console.error('Erreur lors de la copie dans le presse-papiers:', error)
    throw new Error('Impossible de copier dans le presse-papiers')
  }
}

/**
 * Valide et parse une chaîne JSON
 *
 * @param jsonString - Chaîne JSON à parser
 * @param errorRef - Référence réactive pour stocker les erreurs
 * @returns Objet parsé ou null si vide, undefined si invalide
 *
 * @example
 * const error = ref(null)
 * const result = parseJsonField('{"key": "value"}', error)
 * // result: { key: "value" }
 *
 * @example
 * const error = ref(null)
 * const result = parseJsonField('invalid json', error)
 * // result: undefined, error.value: "JSON invalide"
 */
export function parseJsonField(
  jsonString: string,
  errorRef: Ref<string | null>
): Record<string, any> | null | undefined {
  if (!jsonString.trim()) {
    errorRef.value = null
    return null
  }

  try {
    const parsed = JSON.parse(jsonString)
    errorRef.value = null
    return parsed
  } catch (err) {
    errorRef.value = 'JSON invalide'
    return undefined
  }
}

/**
 * Formate une date ISO en format lisible français
 *
 * @param isoString - Date au format ISO 8601
 * @param formatPattern - Pattern de formatage (défaut: 'dd/MM/yyyy HH:mm:ss')
 * @returns Date formatée en français
 */
export function formatDate(
  isoString: string,
  formatPattern: string = 'dd/MM/yyyy HH:mm:ss'
): string {
  try {
    const date = parseISO(isoString)

    if (!isValid(date)) {
      return 'Date invalide'
    }

    return format(date, formatPattern, { locale: fr })
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error)
    return 'Date invalide'
  }
}
