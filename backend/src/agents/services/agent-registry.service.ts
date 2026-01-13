import { Injectable, OnModuleInit } from '@nestjs/common'
import { IAgent } from '../interfaces/agent.interface'

@Injectable()
export class AgentRegistryService implements OnModuleInit {
  private agents: Map<string, IAgent> = new Map()

  /**
   * Méthode appelée lors de l'initialisation du module
   * Elle est utilisée pour logger un message d'initialisation du service AgentRegistry
   */
  onModuleInit() {
    console.log('AgentRegistry initialized')
  }

  /**
   * Enregistre un agent dans le registre
   * Si l'agent est déjà enregistré, une erreur est levée
   * @param {IAgent} agent - L'agent à enregistrer
   */
  register(agent: IAgent): void {
    if (this.agents.has(agent.config.name)) {
      throw new Error(`Agent ${agent.config.name} is already registered`)
    }
    this.agents.set(agent.config.name, agent)
    console.log(`Agent registered: ${agent.config.name}`)
  }

  /**
   * Retourne l'agent enregistré correspondant au nom donné
   * @param {string} name - Le nom de l'agent à récupérer
   * @returns {IAgent | undefined} - L'agent correspondant ou undefined si non trouvé
   */
  getAgent(name: string): IAgent | undefined {
    return this.agents.get(name)
  }

  /**
   * Retournene tous les agents enregistrés
   * @returns tableau des agents enregistrés
   */
  getAllAgents(): IAgent[] {
    return Array.from(this.agents.values())
  }

  /**
   * Retourne tous les agents qui ont le tag donné
   * @param {string} tag - Le tag à rechercher
   * @returns {IAgent[]} - La liste des agents correspondants
   */
  getAgentsByTag(tag: string): IAgent[] {
    return this.getAllAgents().filter(agent => agent.config.tags?.includes(tag))
  }
}
