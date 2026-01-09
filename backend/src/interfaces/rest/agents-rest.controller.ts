import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AgentRegistryService } from '../../agents/services/agent-registry.service';
import { AgentExecutorService } from '../../agents/services/agent-executor.service';
import { ExecuteAgentDto } from './dto/execute-agent.dto';

@Controller('api/agents')
export class AgentsRestController {
  constructor(
    private readonly agentRegistry: AgentRegistryService,
    private readonly agentExecutor: AgentExecutorService,
  ) {}

  @Get()
  listAgents() {
    return {
      agents: this.agentRegistry.getAllAgents().map((agent) => ({
        name: agent.config.name,
        description: agent.config.description,
        version: agent.config.version,
        tags: agent.config.tags,
      })),
    };
  }

  @Get(':name')
  getAgent(@Param('name') name: string) {
    const agent = this.agentRegistry.getAgent(name);
    if (!agent) {
      return { error: `Agent ${name} not found` };
    }
    return {
      config: agent.config,
    };
  }

  @Post(':name/execute')
  async executeAgent(
    @Param('name') name: string,
    @Body() dto: ExecuteAgentDto,
  ) {
    try {
      const result = await this.agentExecutor.executeAgent(name, {
        prompt: dto.prompt,
        context: dto.context,
        options: dto.options,
      });
      return {
        success: true,
        agent: name,
        result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('tags/:tag')
  getAgentsByTag(@Param('tag') tag: string) {
    return {
      tag,
      agents: this.agentRegistry.getAgentsByTag(tag).map((agent) => ({
        name: agent.config.name,
        description: agent.config.description,
      })),
    };
  }
}
