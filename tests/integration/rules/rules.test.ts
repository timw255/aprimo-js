import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("rules integration", () => {
  let ruleId: string;

  it("creates a rule", async () => {
    const res = await aprimo.rules.create({
      enabled: false,
      expression: "",
      includeDraftRecords: false,
      isInternal: false,
      name: "Integration Rule",
      tag: "",
      target: "Record",
      trigger: "WhenSavedOrDeleted",
      conditions: {
        addOrUpdate: [
          {
            reference:
              '<ref:httpRequest uri="https://localhost" retryCount="3" />',
            conditionType: "Reference",
          },
        ],
      },
      actions: {
        addOrUpdate: [
          {
            actionType: "ClassifyRecord",
            gettingType: "CalculatedByReference",
            identifierType: "NamePath",
            reference: '<ref:text out="root" />',
          },
        ],
      },
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    ruleId = res.data!.id;
  });

  it("fetches a list of rules", async () => {
    const res = await aprimo.rules.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged rules", async () => {
    let count = 0;

    for await (const page of aprimo.rules.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("reads the rule", async () => {
    const res = await aprimo.rules.getById(ruleId);
    expectOk(res);
    expect(res.data?.id).toBe(ruleId);
  });

  it("updates the rule", async () => {
    const res = await aprimo.rules.update(ruleId, { enabled: false });
    expectOk(res);
    expect(res.status).toBe(204);
  });

  it("deletes the rule", async () => {
    const res = await aprimo.rules.delete(ruleId);
    expectOk(res);
  });
});
