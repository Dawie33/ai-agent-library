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
