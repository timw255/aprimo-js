import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const recordId = process.env.TEST_RECORD_ID!;

describe("auditTrail integration", () => {
  let auditEntryId: number;

  it("gets audit entries for a record", async () => {
    const auditRes = await aprimo.auditTrail.getforRecord(recordId);
    expectOk(auditRes);
    logShape("auditTrail.getforRecord", auditRes.data);
    expect(auditRes.data?.entries?.length).toBeGreaterThan(0);

    auditEntryId = auditRes.data!.entries[0].id;
  });

  it("gets filtered audit entries", async () => {
    const res = await aprimo.auditTrail.getforRecord(recordId, "change");
    expectOk(res);
    logShape("auditTrail.getforRecord:filtered", res.data);
    expect(res.data).toBeDefined();
  });

  it("gets a specific audit entry by ID", async () => {
    const res = await aprimo.auditTrail.getEntryById(recordId, auditEntryId);
    expectOk(res);
    logShape("auditTrail.getEntryById", res.data);
    expect(res.data?.id).toBe(auditEntryId);
  });
});
