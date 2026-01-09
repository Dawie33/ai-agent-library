import { Injectable } from '@nestjs/common';
import { AgentExecutorService } from '../../agents/services/agent-executor.service';

export interface ChatMessage {
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentName?: string;
}

@Injectable()
export class DashboardService {
  private chatHistory: Map<string, ChatMessage[]> = new Map();

  constructor(private readonly agentExecutor: AgentExecutorService) {}

  async processMessage(
    sessionId: string,
    agentName: string,
    message: string,
  ): Promise<ChatMessage[]> {
    if (!this.chatHistory.has(sessionId)) {
      this.chatHistory.set(sessionId, []);
    }

    const history = this.chatHistory.get(sessionId)!;

    history.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    try {
      const result = await this.agentExecutor.executeAgent(agentName, {
        prompt: message,
        context: { sessionId, historyLength: history.length },
      });

      history.push({
        role: 'agent',
        content: result.result,
        timestamp: new Date(),
        agentName,
      });
    } catch (error) {
      history.push({
        role: 'system',
        content: `Erreur: ${error}`,
        timestamp: new Date(),
      });
    }

    return history;
  }

  getChatHistory(sessionId: string): ChatMessage[] {
    return this.chatHistory.get(sessionId) || [];
  }

  clearChatHistory(sessionId: string): void {
    this.chatHistory.delete(sessionId);
  }
}
