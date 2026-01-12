/**
 * API pour gérer les agents
 * Couche d'abstraction au-dessus de nestApi
 */

import { AgentListResponse } from './interface'
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

}

export default agentApi
