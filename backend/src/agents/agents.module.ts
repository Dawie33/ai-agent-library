import { Module, OnModuleInit } from '@nestjs/common';
import { AgentRegistryService } from './services/agent-registry.service';
import { AgentExecutorService } from './services/agent-executor.service';
import { CodeHelperAgent } from './examples/code-helper.agent';

@Module({
  providers: [AgentRegistryService, AgentExecutorService, CodeHelperAgent],
  exports: [AgentRegistryService, AgentExecutorService],
})
export class AgentsModule implements OnModuleInit {
  constructor(
    private readonly agentRegistry: AgentRegistryService,
    private readonly codeHelperAgent: CodeHelperAgent,
  ) {}

  onModuleInit() {
    this.agentRegistry.register(this.codeHelperAgent);
  }
}
