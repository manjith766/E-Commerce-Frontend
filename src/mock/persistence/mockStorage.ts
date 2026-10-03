// src/mock/persistence/mockStorage.ts
// localStorage wrapper with prefix isolation for mock data.
// All mock data keys are prefixed with "mock_" to avoid conflicts with API mode.

const MOCK_PREFIX = 'mock_';

export const mockStorage = {
  getItem<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(`${MOCK_PREFIX}${key}`);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      console.warn(`[MockStorage] Malformed data for key "${key}", returning fallback.`);
      return fallback;
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${MOCK_PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`[MockStorage] Failed to persist key "${key}":`, e);
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(`${MOCK_PREFIX}${key}`);
  },

  /** Removes all mock_ prefixed keys — development-only reset */
  resetAll(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(MOCK_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    console.log(`[MockStorage] Reset complete. Removed ${keysToRemove.length} keys.`);
  },
};
