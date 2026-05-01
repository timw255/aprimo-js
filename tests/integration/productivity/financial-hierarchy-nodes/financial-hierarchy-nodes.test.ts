import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const hierarchyId = Number(process.env.APRIMO_PM_FINANCIAL_HIERARCHY_ID);

describe("productivity financialHierarchyNodes integration", () => {
  it("gets nodes for a hierarchy", async () => {
    const res =
      await aprimo.productivity.financialHierarchyNodes.getByHierarchyId(
        hierarchyId,
      );
    expectOk(res);
    logShape("financialHierarchyNodes.getByHierarchyId", res.data);
    expect(res.data?.financialHierarchyId).toBeDefined();
  });
});
