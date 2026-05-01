import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const fiscalYearId = Number(process.env.APRIMO_PM_FISCAL_YEAR_ID ?? 1);

describe("productivity financialHierarchies integration", () => {
  let hierarchyId: number;

  it("creates a financial hierarchy", async () => {
    const userId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.financialHierarchies.create({
      encodedTitle: `int-test-fh-${Date.now()}`,
      status: 1,
      fiscialYearId: fiscalYearId,
      users: [{ userId }],
    });
    expectOk(res);
    logShape("financialHierarchies.create", res.data);
    expect(res.data?.financialHierarchyId).toBeDefined();
    hierarchyId = res.data!.financialHierarchyId!;
  });

  it("gets a financial hierarchy by id", async () => {
    const res =
      await aprimo.productivity.financialHierarchies.getById(hierarchyId);
    expectOk(res);
    logShape("financialHierarchies.getById", res.data);
    expect(res.data?.financialHierarchyId).toBeDefined();
  });

  it("updates the financial hierarchy", async () => {
    const res = await aprimo.productivity.financialHierarchies.update(
      hierarchyId,
      { encodedTitle: `int-test-fh-updated-${Date.now()}` },
    );
    expectOk(res);
  });
});
