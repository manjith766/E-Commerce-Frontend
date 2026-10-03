// src/services/interfaces/IAiChatBotService.ts
export interface IAiChatBotService {
  sendChatPrompt(prompt: any, productId: number | null | undefined, userId: number | null): Promise<any>;
}
