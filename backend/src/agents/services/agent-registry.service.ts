import { Injectable, OnModuleInit } from '@nestjs/common';
import { IAgent } from '../interfaces/agent.interface';

@Injectable()
export class AgentRegistryService implements OnModuleInit {
  private agents: Map<string, IAgent> = new Map();

  onModuleInit() {
    console.log('AgentRegistry initialized');
  }

  register(agent: IAgent): void {
    if (this.agents.has(agent.config.name)) {
      throw new Error(`Agent ${agent.config.name} is already registered`);
    }
    this.agents.set(agent.config.name, agent);
    console.log(`Agent registered: ${agent.config.name}`);
  }

  getAgent(name: string): IAgent | undefined {
    return this.agents.get(name);
  }

  getAllAgents(): IAgent[] {
    return Array.from(this.agents.values());
  }

  listAgents(): string[] {
    return Array.from(this.agents.keys());
  }

  getAgentsByTag(tag: string): IAgent[] {
    return this.getAllAgents().filter((agent) =>
      agent.config.tags?.includes(tag),
    );
  }

  unregister(name: string): boolean {
    return this.agents.delete(name);
  }
}
