import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("recordLocks integration", () => {
  let recordId: string;

  it("gets record locks for a record", async () => {
    recordId = process.env.TEST_RECORD_ID!;

    const res = await aprimo.recordLocks.getforRecord(recordId);

    expectOk(res);
    expect(res.data).toBeDefined();
  });
});
