// src/services/api/ApiAiChatBotService.ts
import { IAiChatBotService } from '../interfaces/IAiChatBotService';
import { api } from '../../Config/Api';

export class ApiAiChatBotService implements IAiChatBotService {
  async sendChatPrompt(prompt: any, productId: number | null | undefined, userId: number | null): Promise<any> {
    const response = await api.post('/ai/chat', prompt, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      params: {
        userId,
        productId,
      },
    });
    return response.data;
  }
}
