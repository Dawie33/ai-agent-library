import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'
import { BaseAgent } from '../base/base-agent'
import { AgentInput, AgentOutput } from '../interfaces/agent.interface'
import { SYSTEM_PROMPT } from '../prompts/technology-watch.prompt'

@Injectable()
export class TechnologyWatcherAgent extends BaseAgent {
  private openai: OpenAI

  constructor(private configService: ConfigService) {
    super({
      name: 'Veille Technologique',
      description:
        "Agent expert en veille technologique pour suivre les tendances et nouveautés de l'écosystème JavaScript/TypeScript",
      version: '1.0.0',
      author: 'AI Agent Library',
      tags: ['technology-watch', 'research', 'trends', 'learning'],
    })

    const apiKey = this.configService.get<string>('OPENAI_API_KEY')
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables')
    }
    this.openai = new OpenAI({ apiKey })
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const startTime = Date.now()

    try {
      // Validation de l'input
      if (!this.validate(input)) {
        throw new Error('Invalid input: le sujet de veille est requis dans le prompt')
      }

      const topic = input.prompt

      // Construction du prompt complet
      const fullPrompt = SYSTEM_PROMPT.replace('[SUJET DE VEILLE] : [À REMPLACER', `[SUJET DE VEILLE] : ${topic}`)

      // Appel à l'API OpenAI
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000,
      })

      const reportText = completion.choices[0]?.message?.content || 'Aucune analyse générée'

      // Création de l'output structuré
      return this.createOutput(
        reportText,
        {
          topic,
          model: 'gpt-4o',
          tokensUsed: completion.usage?.total_tokens || 0,
        },
        startTime
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      throw new Error(`Erreur lors de l'exécution de l'agent de veille technologique: ${errorMessage}`)
    }
  }
}
