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

const VERBOSE =
  process.env.APRIMO_TEST_VERBOSE === "1" ||
  process.env.APRIMO_PM_TEST_VERBOSE === "1" ||
  process.env.APRIMO_DAM_TEST_VERBOSE === "1";

export function logShape(label: string, data: unknown): void {
  if (!VERBOSE) return;
  console.log(`\n--- ${label} ---\n${JSON.stringify(data, null, 2)}\n`);
}
