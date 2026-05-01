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

async function freshInvoice(): Promise<number> {
  const now = new Date().toISOString();
  const [ownerId, defaults] = await Promise.all([
    getCurrentUserId(aprimo),
    getTenantDefaults(aprimo),
  ]);
  const res = await aprimo.productivity.invoices.create({
    supplierId,
    currencyCode: defaults.currencyCode,
    invoiceNumber: `INT-INV-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    dateReceived: now,
    dateDue: now,
    invoiceDate: now,
    ownerId,
    creator: ownerId,
    status: 1,
    financeGroupId,
    fiscalYearId,
    invoiceItems: [
      {
        activityId,
        description: "int-test-line-item",
        quantity: 1,
        price: 100,
        total: 100,
        extendedAttributes: [],
      },
    ],
    extendedAttributes: [],
    multipleValueExtendedAttributes: [],
  });
  if (!res.ok || !res.data?.invoiceId) {
    throw new Error(`Failed to seed invoice: ${res.status} ${res.error?.message}`);
  }
  return res.data.invoiceId;
}

describe("productivity invoices integration", () => {
  let invoiceId: number;

  it("creates an invoice", async () => {
    invoiceId = await freshInvoice();
    expect(invoiceId).toBeDefined();
    logShape("invoices.create", { invoiceId });
  });

  it("gets invoices", async () => {
    const res = await aprimo.productivity.invoices.get({ limit: 5 });
    expectOk(res);
    logShape("invoices.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test invoice by id", async () => {
    const res = await aprimo.productivity.invoices.getById(invoiceId);
    expectOk(res);
    logShape("invoices.getById", res.data);
    expect(res.data?.invoiceId).toBe(invoiceId);
  });

  it("updates the test invoice", async () => {
    const res = await aprimo.productivity.invoices.update(invoiceId, {
      invoiceNumber: `INT-INV-UPDATED-${Date.now()}`,
    });
    expectOk(res);
  });

  it("searches invoices", async () => {
    const res = await aprimo.productivity.invoices.search(
      { equals: { fieldname: "status", fieldvalue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("invoices.search", res.data);
  });

  it("submits the invoice", async () => {
    const id = await freshInvoice();
    const res = await aprimo.productivity.invoices.submit(id);
    expectOk(res);
    await aprimo.productivity.invoices.cancel(id).catch(() => {});
    await aprimo.productivity.invoices.delete(id).catch(() => {});
  });

  it("cancels the invoice", async () => {
    const id = await freshInvoice();
    await aprimo.productivity.invoices.submit(id);
    const res = await aprimo.productivity.invoices.cancel(id);
    expectOk(res);
    await aprimo.productivity.invoices.delete(id).catch(() => {});
  });

  it("deletes the test invoice", async () => {
    const res = await aprimo.productivity.invoices.delete(invoiceId);
    expectOk(res);
  });
});
