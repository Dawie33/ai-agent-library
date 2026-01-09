import { Module } from '@nestjs/common';
import { AgentsModule } from '../agents/agents.module';
import { AgentsRestController } from './rest/agents-rest.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [AgentsModule],
  controllers: [AgentsRestController, DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class InterfacesModule {}
