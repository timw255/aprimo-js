import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, getTenantDefaults, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);
const supplierId = Number(process.env.APRIMO_PM_SUPPLIER_ID);
const financeGroupId = Number(process.env.APRIMO_PM_FINANCE_GROUP_ID);
const fiscalYearId = Number(process.env.APRIMO_PM_FISCAL_YEAR_ID);

async function freshCommitment(): Promise<number> {
  const [ownerId, defaults] = await Promise.all([
    getCurrentUserId(aprimo),
    getTenantDefaults(aprimo),
  ]);
  const res = await aprimo.productivity.commitments.create({
    supplierId,
    currencyCode: defaults.currencyCode,
    purchaseOrderNumber: `INT-PO-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ownerId,
    financeGroupId,
    commitmentItems: [
      {
        activityId,
        description: "int-test-line-item",
        quantity: 1,
        price: 100,
        total: 100,
        fiscalYearId,
        fiscalPeriodId: 1,
      },
    ],
  });
  if (!res.ok || !res.data?.committedId) {
    throw new Error(
      `Failed to seed commitment: ${res.status} ${res.error?.message}`,
    );
  }
  return res.data.committedId;
}

describe("productivity commitments integration", () => {
  let commitmentId: number;

  it("creates a commitment", async () => {
    commitmentId = await freshCommitment();
    expect(commitmentId).toBeDefined();
    logShape("commitments.create", { commitmentId });
  });

  it("gets commitments", async () => {
    const res = await aprimo.productivity.commitments.get({ limit: 5 });
    expectOk(res);
    logShape("commitments.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test commitment by id", async () => {
    const res = await aprimo.productivity.commitments.getById(commitmentId);
    expectOk(res);
    logShape("commitments.getById", res.data);
    expect(res.data?.committedId).toBe(commitmentId);
  });

  it("updates the test commitment", async () => {
    const res = await aprimo.productivity.commitments.update(commitmentId, {
      purchaseOrderNumber: `INT-PO-UPDATED-${Date.now()}`,
    });
    expectOk(res);
  });

  it("searches commitments", async () => {
    const res = await aprimo.productivity.commitments.search(
      { equals: { fieldName: "commitmentStatus", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("commitments.search", res.data);
  });

  it("submits the commitment", async () => {
    const id = await freshCommitment();
    const res = await aprimo.productivity.commitments.submit(id);
    expectOk(res);
    await aprimo.productivity.commitments.cancel(id).catch(() => {});
    await aprimo.productivity.commitments.delete(id).catch(() => {});
  });

  it("cancels the commitment", async () => {
    const id = await freshCommitment();
    await aprimo.productivity.commitments.submit(id);
    const res = await aprimo.productivity.commitments.cancel(id);
    expectOk(res);
    await aprimo.productivity.commitments.delete(id).catch(() => {});
  });

  it("deletes the test commitment", async () => {
    const res = await aprimo.productivity.commitments.delete(commitmentId);
    expectOk(res);
  });
});
