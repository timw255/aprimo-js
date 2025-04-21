import { expect } from "vitest";
import { ApiResult } from "../src/client";

export function expectOk<T>(res: ApiResult<T>) {
  if (!res.ok) {
    console.error(
      `API Error [${res.status}]:`,
      res.error?.message || res.error,
      res.error?.raw,
    );
  }
  expect(res.ok).toBe(true);
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
