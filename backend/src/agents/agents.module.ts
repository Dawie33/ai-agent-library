import { Module, OnModuleInit } from '@nestjs/common'
import { AgentRegistryService } from './services/agent-registry.service'
import { AgentExecutorService } from './services/agent-executor.service'
import { CodeReviewAgent } from './examples/code-review.agent'
import { AgentsController } from './controller/agents.controller'
import { TechnologyWatcherAgent } from './examples/technology-watcher.agent'

@Module({
  providers: [AgentRegistryService, AgentExecutorService, CodeReviewAgent, TechnologyWatcherAgent],
  controllers: [AgentsController],
  exports: [AgentRegistryService, AgentExecutorService],
})
export class AgentsModule implements OnModuleInit {
  constructor(
    private readonly agentRegistry: AgentRegistryService,
    private readonly codeReviewAgent: CodeReviewAgent,
    private readonly technologyWatcherAgent: TechnologyWatcherAgent
  ) {}

  onModuleInit() {
    this.agentRegistry.register(this.codeReviewAgent)
    this.agentRegistry.register(this.technologyWatcherAgent)
  }
}
