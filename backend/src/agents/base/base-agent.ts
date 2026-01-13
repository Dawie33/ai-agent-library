import { IAgent, AgentConfig, AgentInput, AgentOutput } from '../interfaces/agent.interface'

export abstract class BaseAgent implements IAgent {
  constructor(public readonly config: AgentConfig) {}

  abstract execute(input: AgentInput): Promise<AgentOutput>

  validate(input: AgentInput): boolean {
    return !!input.prompt && input.prompt.trim().length > 0
  }

  protected createOutput(result: string, metadata?: Record<string, unknown>, startTime?: number): AgentOutput {
    const executionTime = startTime ? Date.now() - startTime : 0
    return {
      result,
      metadata,
      timestamp: new Date(),
      executionTime,
    }
  }
}
