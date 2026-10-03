// src/services/mock/MockAiChatBotService.ts
import { IAiChatBotService } from '../interfaces/IAiChatBotService';

export class MockAiChatBotService implements IAiChatBotService {
  async sendChatPrompt(prompt: any, productId: number | null | undefined, userId: number | null): Promise<any> {
    await new Promise((r) => setTimeout(r, 600));
    const userText = (prompt?.prompt || '').toLowerCase();

    let reply = "I'm your AI Shopping Assistant! How can I help you find what you need today?";

    if (userText.includes('discount') || userText.includes('coupon') || userText.includes('offer')) {
      reply = "You can use coupon code 'WELCOME10' for 10% off, or 'FESTIVE20' for 20% off on orders above ₹1000!";
    } else if (userText.includes('return') || userText.includes('refund')) {
      reply = "We offer a 7-day hassle-free return and refund policy on all eligible products.";
    } else if (userText.includes('delivery') || userText.includes('shipping')) {
      reply = "Standard delivery takes 3-5 business days. Free shipping is available on all orders!";
    } else if (userText.includes('size') || userText.includes('fit')) {
      reply = "Our clothes follow standard Indian sizing (S, M, L, XL, XXL). Check the size chart on the product page for exact measurements.";
    } else if (productId) {
      reply = `Regarding product #${productId}: It's in stock and ready to ship with top customer ratings!`;
    }

    return {
      message: reply,
      role: 'assistant',
    };
  }
}
