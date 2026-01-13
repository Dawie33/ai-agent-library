/**
 * Utilitaires pour l'export PDF des résultats d'agents
 */

import html2pdf from 'html2pdf.js'

/**
 * Options par défaut pour l'export PDF
 */
const DEFAULT_PDF_OPTIONS = {
  margin: [10, 10, 10, 10], // top, right, bottom, left (en mm)
  filename: 'agent-result.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  }
}

/**
 * Exporte un élément HTML en PDF
 *
 * @param element - Élément DOM ou sélecteur CSS
 * @param options - Options personnalisées pour l'export
 * @returns Promise résolue quand l'export est terminé
 *
 * @example
 * await exportToPdf('#result', { filename: 'analyse-code.pdf' })
 */
export async function exportToPdf(
  element: HTMLElement | string,
  options: Partial<typeof DEFAULT_PDF_OPTIONS> = {}
): Promise<void> {
  const finalOptions = { ...DEFAULT_PDF_OPTIONS, ...options }

  try {
    await html2pdf()
      .set(finalOptions)
      .from(element)
      .save()
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    throw new Error('Impossible d\'exporter le PDF')
  }
}

/**
 * Génère un nom de fichier pour l'export PDF
 *
 * @param agentName - Nom de l'agent
 * @param type - Type de résultat (optionnel)
 * @returns Nom de fichier formaté
 *
 * @example
 * generatePdfFilename('TechWatchAgent', 'tech_watch')
 * // Returns: "techwatch-veille-2024-01-12-14-30.pdf"
 */
export function generatePdfFilename(
  agentName: string,
  type: string = 'result'
): string {
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS

  const sanitizedName = agentName
    .toLowerCase()
    .replace(/agent$/i, '') // Enlever "Agent" à la fin
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const typeLabel = type === 'tech_watch' ? 'veille' :
                    type === 'code_analysis' ? 'analyse' :
                    'resultat'

  return `${sanitizedName}-${typeLabel}-${dateStr}-${timeStr}.pdf`
}

/**
 * Prépare un élément pour l'export PDF (nettoyage, styles)
 *
 * @param element - Élément à préparer
 * @returns Élément cloné et préparé
 */
export function prepareElementForPdf(element: HTMLElement): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement

  // Supprimer les éléments interactifs qui n'ont pas de sens dans un PDF
  const interactiveElements = clone.querySelectorAll('button, input[type="checkbox"], details')
  interactiveElements.forEach(el => {
    if (el.tagName === 'DETAILS') {
      // Ouvrir tous les details pour l'export
      (el as HTMLDetailsElement).open = true
    } else {
      el.remove()
    }
  })

  // Forcer certains styles pour l'export
  clone.style.backgroundColor = 'white'
  clone.style.padding = '20px'

  return clone
}

/**
 * Exporte un résultat d'agent en PDF avec préparation automatique
 *
 * @param element - Élément contenant le résultat
 * @param agentName - Nom de l'agent
 * @param resultType - Type de résultat
 *
 * @example
 * await exportAgentResultToPdf(
 *   document.getElementById('result'),
 *   'TechWatchAgent',
 *   'tech_watch'
 * )
 */
export async function exportAgentResultToPdf(
  element: HTMLElement,
  agentName: string,
  resultType: string = 'generic'
): Promise<void> {
  // Préparer l'élément
  const prepared = prepareElementForPdf(element)

  // Ajouter temporairement au DOM (invisible)
  prepared.style.position = 'absolute'
  prepared.style.left = '-9999px'
  document.body.appendChild(prepared)

  try {
    // Générer le nom de fichier
    const filename = generatePdfFilename(agentName, resultType)

    // Exporter
    await exportToPdf(prepared, {
      filename,
      margin: [15, 15, 15, 15]
    })
  } finally {
    // Nettoyer
    document.body.removeChild(prepared)
  }
}

