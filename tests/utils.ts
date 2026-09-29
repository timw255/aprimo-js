import { expect } from "vitest";
import { ApiResult } from "../src/client";

export function expectOk<T>(res: ApiResult<T>) {
  if (!res.ok) {
    console.error(
      `API Error [${res.status}]:`,
      res.error?.message ?? res.error,
      res.error?.raw,
    );
  }
  expect(res.ok).toBe(true);
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Poll `read` until `predicate` holds. Some DAM writes (classification
 * permissions in particular) are eventually consistent, so a read issued
 * straight after a 204 can still return the previous state.
 */
export async function eventually<T>(
  read: () => Promise<ApiResult<T>>,
  predicate: (data: T | undefined) => boolean,
  { timeoutMs = 8000, intervalMs = 250 } = {},
): Promise<ApiResult<T>> {
  const deadline = Date.now() + timeoutMs;
  let last = await read();
  while (Date.now() < deadline) {
    if (last.ok && predicate(last.data)) return last;
    await delay(intervalMs);
    last = await read();
  }
  return last;
}

const VERBOSE =
  process.env.APRIMO_TEST_VERBOSE === "1" ||
  process.env.APRIMO_PM_TEST_VERBOSE === "1" ||
  process.env.APRIMO_DAM_TEST_VERBOSE === "1";

export function logShape(label: string, data: unknown): void {
  if (!VERBOSE) return;
  console.log(`\n--- ${label} ---\n${JSON.stringify(data, null, 2)}\n`);
}
