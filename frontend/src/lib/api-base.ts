/**
 * Base URL da API Express (checkout, auth, etc.).
 * Em dev: backend em PORT (ex.: 4500); em produção, definir no deploy.
 */
export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '')
  if (base) return base
  return 'http://localhost:4500'
}
