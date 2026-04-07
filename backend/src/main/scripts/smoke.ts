/**
 * Smoke test básico HTTP.
 *
 * Uso:
 * - API rodando (ex.: http://localhost:4500)
 * - `node --env-file .env dist/main/scripts/smoke.js` (após build) ou `pnpm tsx --env-file .env src/main/scripts/smoke.ts`
 */
import { env } from '@/main/config/env';

const fetchFn = async (...args: Parameters<(typeof globalThis)['fetch']>) => {
  return globalThis.fetch(...args);
};

async function assertOk(path: string) {
  const res = await fetchFn(`http://localhost:${env.port}${path}`);

  if (!res.ok) {
    const body = await res.text().catch(() => '');

    throw new Error(`${path} falhou: ${res.status} ${body}`);
  }
}

async function run() {
  await assertOk('/health');
  await assertOk('/api/products');
  console.info('Smoke OK');
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

