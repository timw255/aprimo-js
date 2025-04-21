import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("auditTrail integration", () => {
  let recordId: string;
  let auditEntryId: number;

  it("gets audit entries for a record", async () => {
    recordId = process.env.TEST_RECORD_ID!;

    const auditRes = await aprimo.auditTrail.getforRecord(recordId);
    expectOk(auditRes);
    expect(auditRes.data?.entries?.length).toBeGreaterThan(0);

    auditEntryId = auditRes.data!.entries[0].id;
  });

  it("gets filtered audit entries", async () => {
    const res = await aprimo.auditTrail.getforRecord(recordId, "change");
    expectOk(res);
    expect(res.data).toBeDefined();
  });

  it("gets a specific audit entry by ID", async () => {
    const res = await aprimo.auditTrail.getEntryById(recordId, auditEntryId);
    expectOk(res);
    expect(res.data?.id).toBe(auditEntryId);
  });
});
