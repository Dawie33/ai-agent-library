// Types TypeScript pour les réponses
export interface AgentConfig {
  name: string
  description: string
  version: string
  author?: string
  tags?: string[]
}

export interface AgentListResponse {
  agents: AgentConfig[]
}

export interface AgentDetailResponse {
  config: AgentConfig
}

export interface ExecuteAgentRequest {
  prompt: string
  context?: Record<string, any>
  options?: Record<string, any>
}

export interface AgentOutput {
  result: string
  metadata?: Record<string, any>
  timestamp: string
  executionTime: number
}

export interface ExecuteAgentResponse {
  success: boolean
  agent?: string
  result?: AgentOutput
  error?: string
}

// Structure JSON retournée par CodeReviewAgent
export interface CodeAnalysis {
  resume: string
  comprehension: {
    objectif: string
    technologie: string
    type: string
  }
  problemes: {
    critiques: Array<{
      titre: string
      description: string
      impact: string
      localisation: string
      priorite: 'critique' | 'important' | 'mineur'
    }>
    importants: Array<any>
    mineurs: Array<any>
  }
  solutions: Array<{
    probleme: string
    solution: string
    pourquoi: string
    codeAvant: string
    codeApres: string
  }>
  planAction: {
    urgent: string[]
    important: string[]
    bonus: string[]
  }
  evaluation: {
    score: number
    pointsForts: string[]
    axesProgression: string[]
    ressources: string[]
    conseilMentorat: string
  }
}
