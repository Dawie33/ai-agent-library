export interface AgentConfig {
  name: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
}

export interface AgentInput {
  prompt: string;
  context?: Record<string, any>;
  options?: Record<string, any>;
}

export interface AgentOutput {
  result: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  executionTime: number;
}

export interface IAgent {
  config: AgentConfig;
  execute(input: AgentInput): Promise<AgentOutput>;
  validate?(input: AgentInput): boolean;
}

export class ExecuteAgentDto {
  prompt: string;
  context?: Record<string, any>;
  options?: Record<string, any>;
}

export class ExecuteMultipleAgentsDto {
  agentNames: string[];
  prompt: string;
  context?: Record<string, any>;
  options?: Record<string, any>;
}
