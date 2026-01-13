import { Injectable } from '@nestjs/common'
import { AgentRegistryService } from './agent-registry.service'
import { AgentInput, AgentOutput } from '../interfaces/agent.interface'

@Injectable()
export class AgentExecutorService {
  constructor(private readonly agentRegistry: AgentRegistryService) {}

  async executeAgent(agentName: string, input: AgentInput): Promise<AgentOutput> {
    const agent = this.agentRegistry.getAgent(agentName)

    if (!agent) {
      throw new Error(`Agent ${agentName} not found`)
    }

    try {
      return await agent.execute(input)
    } catch (error) {
      throw new Error(`Error executing agent ${agentName}: ${error}`)
    }
  }
}
