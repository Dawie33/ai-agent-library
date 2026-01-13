/**
 * Service API pour communiquer avec le backend NestJS
 */

import { createApiError, ApiError } from '@/utils/errors'

const API_BASE_URL = '/api' // Le proxy Vite redirige vers http://localhost:3000

const nestApi = {
  /**
   * Envoie une requête GET vers le backend NestJS
   * @param url L'URL de la ressource à appeler
   * @param options Les options de la requête (headers, etc.)
   * @returns La réponse au format JSON
   * @throws {ApiError} Si l'URL est manquante ou si la requête échoue
   */
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    if (!url) {
      throw new ApiError('URL est requise pour la requête GET')
    }

    try {
      const response = await fetch(API_BASE_URL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw createApiError(
          response.status,
          errorData.message || `GET ${url} a échoué avec le statut ${response.status}`,
          errorData
        )
      }

      return await response.json()
    } catch (error) {
      // Si c'est déjà une ApiError, la relancer telle quelle
      if (error instanceof ApiError) {
        throw error
      }
      // Sinon, c'est une erreur réseau
      throw new ApiError(
        error instanceof Error ? error.message : 'Erreur réseau inconnue'
      )
    }
  },

  /**
   * Envoie une requête POST vers le backend NestJS
   * @param url L'URL de la ressource à appeler
   * @param data Les données à envoyer dans le corps de la requête
   * @param options Les options de la requête (headers, etc.)
   * @returns La réponse au format JSON
   * @throws {ApiError} Si l'URL est manquante ou si la requête échoue
   */
  post: async <T>(url: string, data?: any, options?: RequestInit): Promise<T> => {
    if (!url) {
      throw new ApiError('URL est requise pour la requête POST')
    }

    try {
      const response = await fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw createApiError(
          response.status,
          errorData.message || `POST ${url} a échoué avec le statut ${response.status}`,
          errorData
        )
      }

      return await response.json()
    } catch (error) {
      // Si c'est déjà une ApiError, la relancer telle quelle
      if (error instanceof ApiError) {
        throw error
      }
      // Sinon, c'est une erreur réseau
      throw new ApiError(
        error instanceof Error ? error.message : 'Erreur réseau inconnue'
      )
    }
  },

}

export default nestApi 

