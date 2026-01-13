/**
 * Détecte si un snippet de code est en TypeScript ou JavaScript.
 * Retourne 'typescript' si le code contient des annotations de type,
 * 'javascript' sinon, ou 'unknown' si le code est vide/invalide.
 *
 * @param {string} code - Le snippet de code à analyser
 * @returns {string} 'typescript', 'javascript', ou 'unknown'
 */
export function detectLanguage(code: string): string {
  if (!code || code.trim().length === 0) return 'unknown'

  // TypeScript: recherche d'annotations de type, interfaces, types, generics
  if (
    /interface\s+\w+/i.test(code) || // interface Foo
    /type\s+\w+\s*=/i.test(code) || // type Foo =
    /:\s*(string|number|boolean|any|void|never|unknown)\b/i.test(code) || // : string
    /<[A-Z]\w*>/i.test(code) || // Generics <T>
    /as\s+(string|number|boolean|const)/i.test(code) || // as string
    /enum\s+\w+/i.test(code) // enum Foo
  ) {
    return 'typescript'
  }

  // JavaScript: vérifie la présence de syntaxe JS valide
  if (
    /(const|let|var)\s+\w+/.test(code) ||
    /function\s+\w+\s*\(/.test(code) ||
    /=>\s*[{(]/.test(code) || // Arrow functions
    /(require|import)\s*\(/.test(code) ||
    /import\s+.*from/.test(code) ||
    /export\s+(default|const|function|class)/.test(code) ||
    /class\s+\w+/.test(code)
  ) {
    return 'javascript'
  }

  return 'unknown'
}
