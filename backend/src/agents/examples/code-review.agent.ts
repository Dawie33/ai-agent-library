import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'
import { BaseAgent } from '../base/base-agent'
import { AgentInput, AgentOutput } from '../interfaces/agent.interface'
import { SYSTEM_PROMPT } from '../prompts/code-review-agent.prompt'
import { detectLanguage } from '../utils'

@Injectable()
export class CodeReviewAgent extends BaseAgent {
  private openai: OpenAI

  constructor(private configService: ConfigService) {
    super({
      name: 'Revue de Code',
      description:
        'Agent expert pour analyser du code et fournir des recommandations détaillées avec une approche pédagogique',
      version: '2.0.0',
      author: 'AI Agent Library',
      tags: ['coding', 'code-review', 'mentoring', 'analysis', 'best-practices'],
    })

    const apiKey = this.configService.get<string>('OPENAI_API_KEY')
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not found in environment variables')
    }
    this.openai = new OpenAI({ apiKey })
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const startTime = Date.now()

    if (!this.validate(input)) {
      throw new Error('Invalid input: code to analyze is required in prompt')
    }

    const codeToAnalyze = input.prompt

    const jsonPrompt = `${SYSTEM_PROMPT}

    [CODE À ANALYSER]
    \`\`\`
    ${codeToAnalyze}
    \`\`\`

    IMPORTANT: Retourne ta réponse au format JSON avec cette structure exacte:
    {
      "resume": "Résumé en 2-3 phrases",
      "comprehension": {
        "objectif": "...",
        "technologie": "...",
        "type": "..."
      },
      "problemes": {
        "critiques": [
          {
            "titre": "...",
            "description": "...",
            "impact": "...",
            "localisation": "...",
            "priorite": "critique"
          }
        ],
        "importants": [...],
        "mineurs": [...]
      },
      "solutions": [
        {
          "probleme": "...",
          "solution": "...",
          "pourquoi": "...",
          "codeAvant": "...",
          "codeApres": "..."
        }
      ],
      "planAction": {
        "urgent": ["..."],
        "important": ["..."],
        "bonus": ["..."]
      },
      "evaluation": {
        "score": 7,
        "pointsForts": ["...", "..."],
        "axesProgression": ["...", "..."],
        "ressources": ["...", "..."],
        "conseilMentorat": "..."
      }
    }`

    try {
      // Appel à l'API OpenAI avec response_format JSON
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: jsonPrompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 4000,
      })

      const analysisText = completion.choices[0]?.message?.content || '{}'

      // Parser le JSON retourné par OpenAI
      let analysisJson: Record<string, unknown>
      try {
        analysisJson = JSON.parse(analysisText) as Record<string, unknown>
      } catch {
        // Fallback si le parsing échoue
        analysisJson = {
          error: 'Erreur de parsing JSON',
          rawResponse: analysisText,
        }
      }

      return this.createOutput(
        JSON.stringify(analysisJson),
        {
          agentType: 'code-review',
          codeAnalyzed: codeToAnalyze,
          language: detectLanguage(codeToAnalyze),
          model: 'gpt-4o',
          tokensUsed: completion.usage?.total_tokens || 0,
          format: 'json',
        },
        startTime
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Erreur lors de l'analyse du code: ${errorMessage}`)
    }
  }
}
