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
const fiscalYearId = Number(process.env.APRIMO_PM_FISCAL_YEAR_ID);

async function freshJv(): Promise<number> {
  const now = new Date().toISOString();
  const [creatorId, defaults] = await Promise.all([
    getCurrentUserId(aprimo),
    getTenantDefaults(aprimo),
  ]);
  const res = await aprimo.productivity.journalVouchers.create({
    supplierId,
    currencyCode: defaults.currencyCode,
    journalVoucherDate: now,
    creatorId,
    fiscalYearId,
    journalVoucherItems: [
      { activityId, description: "int-test-jv-item", quantity: 1, price: 50, total: 50 },
    ],
  });
  if (!res.ok || !res.data?.journalVoucherId) {
    throw new Error(`Failed to seed JV: ${res.status} ${res.error?.message}`);
  }
  return res.data.journalVoucherId;
}

describe("productivity journalVouchers integration", () => {
  let jvId: number;

  it("creates a journal voucher", async () => {
    jvId = await freshJv();
    expect(jvId).toBeDefined();
    logShape("journalVouchers.create", { jvId });
  });

  it("gets journal vouchers", async () => {
    const res = await aprimo.productivity.journalVouchers.get({ limit: 5 });
    expectOk(res);
    logShape("journalVouchers.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test journal voucher by id", async () => {
    const res = await aprimo.productivity.journalVouchers.getById(jvId);
    expectOk(res);
    logShape("journalVouchers.getById", res.data);
    expect(res.data?.journalVoucherId).toBe(jvId);
  });

  it("updates the test journal voucher", async () => {
    const res = await aprimo.productivity.journalVouchers.update(jvId, {
      journalVoucherDate: new Date().toISOString(),
    });
    expectOk(res);
  });

  it("searches journal vouchers", async () => {
    const res = await aprimo.productivity.journalVouchers.search(
      { equals: { fieldName: "journalVoucherStatus", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("journalVouchers.search", res.data);
  });

  it("deletes the test journal voucher", async () => {
    const res = await aprimo.productivity.journalVouchers.delete(jvId);
    expectOk(res);
  });
});
