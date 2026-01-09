import { Controller, Get } from '@nestjs/common';
import { AgentRegistryService } from '../../agents/services/agent-registry.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly agentRegistry: AgentRegistryService) {}

  @Get()
  /**
   *  Récupère les données du tableau de bord.
   *  @returns Les données du tableau de bord contenant la liste des agents et des statistiques.
   *  Les statistiques incluent le nombre total d'agents et leurs catégories (tags).
   */
  getDashboard() {
    const agents = this.agentRegistry.getAllAgents();

    return {
      title: 'AI Agent Library - Dashboard',
      agents: agents.map((agent) => ({
        name: agent.config.name,
        description: agent.config.description,
        version: agent.config.version,
        tags: agent.config.tags,
      })),
      stats: {
        totalAgents: agents.length,
        categories: this.getCategories(
          agents.flatMap((a) => a.config.tags || []),
        ),
      },
    };
  }

  /**
   * Récupère la liste des catégories (tags) avec leur nombre d'occurrences.
   * @param tags La liste des tags à comptabiliser.
   * @returns La liste des catégories avec leur nombre d'occurrences.
   */
  private getCategories(tags: string[]): { tag: string; count: number }[] {
    const tagCount = tags.reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(tagCount).map(([tag, count]) => ({ tag, count }));
  }
}
