/**
 * API pour gérer les agents
 * Couche d'abstraction au-dessus de nestApi
 */

import { AgentListResponse, AgentDetailResponse, ExecuteAgentRequest, ExecuteAgentResponse } from './interface'
import nestApi from './nestApi'


const agentApi = {
  /**
   * Récupère la liste de tous les agents
   * @param options Options de la requête
   * @returns Liste des agents
   */
  get: async (options?: RequestInit): Promise<AgentListResponse> => {
    return nestApi.get<AgentListResponse>('/agents', options)
  },

  /**
   * Récupère les détails d'un agent spécifique
   * @param agentName Nom de l'agent
   * @param options Options de la requête
   * @returns Détails de l'agent
   */
  getDetails: async (agentName: string, options?: RequestInit): Promise<AgentDetailResponse> => {
    return nestApi.get<AgentDetailResponse>(`/agents/${agentName}`, options)
  },

  /**
   * Exécute un agent avec un prompt
   * @param agentName Nom de l'agent
   * @param request Données de la requête
   * @param options Options de la requête
   * @returns Résultat de l'exécution
   */
  execute: async (
    agentName: string,
    request: ExecuteAgentRequest,
    options?: RequestInit
  ): Promise<ExecuteAgentResponse> => {
    return nestApi.post<ExecuteAgentResponse>(`/agents/${agentName}/execute`, request, options)
  },

}

export default agentApi
