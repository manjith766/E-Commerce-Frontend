// src/mock/utils/idGenerator.ts
// Simple auto-increment ID generator for mock data.

let currentId = 10000;

export function generateId(): number {
  return ++currentId;
}

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function generateMockJwt(role: string): string {
  return `mock-jwt-${role}-${Date.now()}`;
}
