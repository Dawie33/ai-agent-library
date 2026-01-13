import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AgentRegistryService } from '../../agents/services/agent-registry.service'
import { AgentExecutorService } from '../../agents/services/agent-executor.service'
import { ExecuteAgentDto } from '../interfaces/agent.interface'

@Controller('api/agents')
export class AgentsController {
  constructor(
    private readonly agentRegistry: AgentRegistryService,
    private readonly agentExecutor: AgentExecutorService
  ) {}

  @Get()
  /**
   * Retourne la liste de tous les agents enregistrés avec leurs détails
   */
  listAgents() {
    return {
      agents: this.agentRegistry.getAllAgents().map(agent => ({
        name: agent.config.name,
        description: agent.config.description,
        version: agent.config.version,
        tags: agent.config.tags,
      })),
    }
  }

  @Get(':name')
  /**
   * Retourne l'agent enregistré correspondant au nom donné
   * Si l'agent n'existe pas, une erreur est retournée
   * @param {string} name - Le nom de l'agent à récupérer
   * @returns {IAgent | { error: string }} - L'agent correspondant ou une erreur si non trouvé
   */
  getAgent(@Param('name') name: string) {
    const agent = this.agentRegistry.getAgent(name)
    if (!agent) {
      return { error: `Agent ${name} not found` }
    }
    return {
      config: agent.config,
    }
  }

  @Post(':name/execute')
  /**
   * Execute l'agent enregistré correspondant au nom donné
   * avec les paramètres de context et d'option fournis
   * @param {string} name - Le nom de l'agent à exécuter
   * @param {ExecuteAgentDto} dto - Les paramètres d'exécution de l'agent
   * @returns {Promise<{ success: boolean, agent: string, result: AgentOutput }>}
   * @throws {Error} Si l'exécution de l'agent échoue
   */
  async executeAgent(@Param('name') name: string, @Body() dto: ExecuteAgentDto) {
    try {
      const result = await this.agentExecutor.executeAgent(name, {
        prompt: dto.prompt,
        context: dto.context,
        options: dto.options,
      })
      return {
        success: true,
        agent: name,
        result,
      }
    } catch (error) {
      throw new Error(`Failed to execute agent ${name}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  @Get('tags/:tag')
  /**
   * Retourne la liste des agents qui ont le tag donné
   * @param {string} tag - Le tag à recherche
   * @returns {Promise<{ tag: string, agents: IAgentConfig[] }>}
   * @example
   * getAgentsByTag('javascript').then((response) => {
   *   console.log(response.tag);
   *   console.log(response.agents);
   * });
   */
  getAgentsByTag(@Param('tag') tag: string) {
    return {
      tag,
      agents: this.agentRegistry.getAgentsByTag(tag).map(agent => ({
        name: agent.config.name,
        description: agent.config.description,
      })),
    }
  }
}
