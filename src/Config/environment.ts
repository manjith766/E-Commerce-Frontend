// src/config/environment.ts
// Centralized environment configuration reader.
// All environment-dependent values are read here and exported.

export type DataMode = 'mock' | 'api';

const rawMode = process.env.REACT_APP_DATA_MODE || 'mock';

if (rawMode !== 'mock' && rawMode !== 'api') {
  throw new Error(
    `[Environment] Unsupported REACT_APP_DATA_MODE="${rawMode}". ` +
    `Allowed values are "mock" or "api". ` +
    `Check your .env file and restart the dev server.`
  );
}

export const DATA_MODE: DataMode = rawMode as DataMode;
export const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5454';
export const IS_MOCK_MODE: boolean = DATA_MODE === 'mock';
export const IS_API_MODE: boolean = DATA_MODE === 'api';

// Log mode at startup (development only)
if (process.env.NODE_ENV === 'development') {
  console.log(`[Environment] Data mode: ${DATA_MODE}`);
  if (IS_API_MODE) {
    console.log(`[Environment] API base URL: ${API_BASE_URL}`);
  }
}
