import { Skill } from './skill.interface'

export interface AgentConfig {
  name: string
  description: string
  version: string
  author?: string
  tags?: string[]
  skills?: Skill[]
}

export interface AgentInput {
  prompt: string
  context?: Record<string, unknown>
  options?: Record<string, unknown>
}

export interface AgentOutput {
  result: string
  metadata?: Record<string, unknown>
  timestamp: Date
  executionTime: number
}

export interface IAgent {
  config: AgentConfig
  execute(input: AgentInput): Promise<AgentOutput>
  validate?(input: AgentInput): boolean
}

export class ExecuteAgentDto {
  prompt: string
  context?: Record<string, unknown>
  options?: Record<string, unknown>
}

export class ExecuteMultipleAgentsDto {
  agentNames: string[]
  prompt: string
  context?: Record<string, unknown>
  options?: Record<string, unknown>
}
