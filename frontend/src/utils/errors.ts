/**
 * Classes d'erreurs personnalisées pour les appels API frontend
 */

/**
 * Classe de base pour les erreurs API
 *
 * @class ApiError
 * @extends {Error}
 *
 * @example
 * throw new ApiError('Erreur serveur', 500, { details: 'Info supplémentaire' })
 */
export class ApiError extends Error {
  /**
   * Crée une instance d'ApiError
   *
   * @param {string} message - Message d'erreur descriptif
   * @param {number} [statusCode] - Code HTTP de l'erreur (ex: 404, 500)
   * @param {any} [data] - Données supplémentaires liées à l'erreur
   */
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}


/**
 * Erreur de requête invalide (400 Bad Request)
 *
 * Utilisée quand les données envoyées sont invalides ou mal formatées.
 *
 * @class BadRequestError
 * @extends {ApiError}
 *
 * @example
 * throw new BadRequestError('Format de données invalide', { field: 'email' })
 */
export class BadRequestError extends ApiError {
  /**
   * Crée une instance de BadRequestError
   *
   * @param {string} [message='Requête invalide'] - Message d'erreur
   * @param {any} [data] - Détails sur les champs invalides
   */
  constructor(message: string = 'Requête invalide', data?: any) {
    super(message, 400, data)
    this.name = 'BadRequestError'
  }
}


/**
 * Erreur de ressource non trouvée (404 Not Found)
 *
 * Utilisée quand la ressource demandée n'existe pas.
 *
 * @class NotFoundError
 * @extends {ApiError}
 *
 * @example
 * throw new NotFoundError('Agent "CodeReviewAgent" introuvable')
 */
export class NotFoundError extends ApiError {
  /**
   * Crée une instance de NotFoundError
   *
   * @param {string} [message='Ressource non trouvée'] - Message d'erreur
   */
  constructor(message: string = 'Ressource non trouvée') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

/**
 * Erreur serveur interne (500 Internal Server Error)
 *
 * Utilisée quand le serveur rencontre une erreur inattendue.
 *
 * @class ServerError
 * @extends {ApiError}
 *
 * @example
 * throw new ServerError('Erreur lors du traitement')
 */
export class ServerError extends ApiError {
  /**
   * Crée une instance de ServerError
   *
   * @param {string} [message='Erreur interne du serveur'] - Message d'erreur
   */
  constructor(message: string = 'Erreur interne du serveur') {
    super(message, 500)
    this.name = 'ServerError'
  }
}

/**
 * Fonction factory pour créer l'erreur appropriée selon le code HTTP
 *
 * Crée automatiquement l'instance d'erreur la plus adaptée en fonction
 * du code de statut HTTP reçu.
 *
 * @param {number} statusCode - Code HTTP de l'erreur (400, 401, 403, 404, 500, etc.)
 * @param {string} message - Message d'erreur descriptif
 * @param {any} [data] - Données supplémentaires (optionnel)
 * @returns {ApiError} Instance d'erreur typée selon le code HTTP
 *
 * @example
 * const error = createApiError(404, 'Agent introuvable')
 * // Retourne une instance de NotFoundError
 *
 * @example
 * const error = createApiError(400, 'Email invalide', { field: 'email' })
 * // Retourne une instance de BadRequestError avec les détails
 */
export function createApiError(
  statusCode: number,
  message: string,
  data?: any
): ApiError {
  switch (statusCode) {
    case 400:
      return new BadRequestError(message, data)
    case 404:
      return new NotFoundError(message)
    case 500:
      return new ServerError(message)
    default:
      return new ApiError(message, statusCode, data)
  }
}
