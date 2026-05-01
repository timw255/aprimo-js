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

const fiscalYearId = Number(process.env.APRIMO_PM_FISCAL_YEAR_ID ?? 1);

describe("productivity fundingAccounts integration", () => {
  let fundingAccountId: number;

  it("creates a funding account", async () => {
    const [ownerId, defaults] = await Promise.all([
      getCurrentUserId(aprimo),
      getTenantDefaults(aprimo),
    ]);
    const res = await aprimo.productivity.fundingAccounts.create({
      title: `int-test-fa-${Date.now()}`,
      status: 1,
      administrator: ownerId,
      fundingAccountContact: ownerId,
      fundingAccountType: 1,
      source: 1,
      fiscalYear: fiscalYearId,
      budgetedCurrency: defaults.currencyCode,
      creator: ownerId,
      createdDate: new Date().toISOString(),
      financeGroupClassification: 1,
    });
    expectOk(res);
    logShape("fundingAccounts.create", res.data);
    expect(res.data?.fundingAccountId).toBeDefined();
    fundingAccountId = res.data!.fundingAccountId!;
  });

  it("gets a funding account by id", async () => {
    const res =
      await aprimo.productivity.fundingAccounts.getById(fundingAccountId);
    expectOk(res);
    logShape("fundingAccounts.getById", res.data);
    expect(res.data?.fundingAccountId).toBeDefined();
  });

  it("gets funding account summary", async () => {
    const res =
      await aprimo.productivity.fundingAccounts.getSummary(fundingAccountId);
    expectOk(res);
    logShape("fundingAccounts.getSummary", res.data);
    expect(res.data?.budget).toBeDefined();
  });

  it("updates the funding account", async () => {
    const res = await aprimo.productivity.fundingAccounts.update(
      fundingAccountId,
      { title: `int-test-fa-updated-${Date.now()}` },
    );
    expectOk(res);
  });
});
