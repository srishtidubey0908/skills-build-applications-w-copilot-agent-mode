export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeArray<T>(payload: any, key: string): T[] {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload[key])) {
    return payload[key];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  const firstArray = Object.values(payload).find(Array.isArray);
  return Array.isArray(firstArray) ? firstArray : [];
}
