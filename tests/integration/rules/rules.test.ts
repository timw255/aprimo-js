import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
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
      name: `Integration Rule ${Date.now()}`,
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
    logShape("rules.create", res.data);
    expect(res.data?.id).toBeDefined();
    ruleId = res.data!.id;
  });

  it("fetches a list of rules", async () => {
    const res = await aprimo.rules.get({ pageSize: 5 });
    expectOk(res);
    logShape("rules.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged rules", async () => {
    let count = 0;

    for await (const page of aprimo.rules.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("rules.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("reads the rule", async () => {
    const res = await aprimo.rules.getById(ruleId);
    expectOk(res);
    logShape("rules.getById", res.data);
    expect(res.data?.id).toBe(ruleId);
  });

  it("updates the rule", async () => {
    const res = await aprimo.rules.update(ruleId, { enabled: false });
    expectOk(res);
    logShape("rules.update", res.data);
    expect(res.status).toBe(204);
  });

  it("deletes the rule", async () => {
    const res = await aprimo.rules.delete(ruleId);
    expectOk(res);
    logShape("rules.delete", res.data);
  });

  // Each of these action types was previously absent from the `RuleAction`
  // union, so a rule using one could neither be written nor narrowed on read.
  const newActions = [
    { actionType: "PredictiveMetadata", executionTime: "Delayed" },
    { actionType: "EnhancedCaptioning", executionTime: "Delayed" },
    { actionType: "VideoSummary", executionTime: "Delayed" },
    { actionType: "ResolveContentType", executionTime: "Delayed" },
    { actionType: "RunTextMatch", executionTime: "Delayed" },
    { actionType: "RunReviewAgent", executionTime: "Delayed", builtInAgentId: "BrandCompliance" },
    { actionType: "CreateActivity", executionTime: "Delayed", activityDuration: 60, activityTypeId: 1 },
  ] as const;

  it.each(newActions.map((a) => [a.actionType, a] as const))(
    "creates a rule with the %s action",
    async (_name, action) => {
      const res = await aprimo.rules.create({
        enabled: false,
        expression: "",
        includeDraftRecords: false,
        isInternal: false,
        name: `rule ${action.actionType} ${Date.now() % 100000}`,
        tag: "",
        target: "Record",
        trigger: "WhenSavedOrDeleted",
        conditions: { addOrUpdate: [{ conditionType: "ObjectChanged" }] },
        actions: { addOrUpdate: [action] },
      });
      expectOk(res);
      expect(res.data?.id).toBeDefined();
      await aprimo.rules.delete(res.data!.id);
    },
  );

  it("creates a rule with the FileProcessingCompleted condition", async () => {
    const res = await aprimo.rules.create({
      enabled: false,
      expression: "",
      includeDraftRecords: false,
      isInternal: false,
      name: `rule FileProcessingCompleted ${Date.now() % 100000}`,
      tag: "",
      target: "Record",
      trigger: "WhenSavedOrDeleted",
      conditions: { addOrUpdate: [{ conditionType: "FileProcessingCompleted" }] },
      actions: { addOrUpdate: [{ actionType: "RefreshFiles", executionTime: "Delayed" }] },
    });
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    await aprimo.rules.delete(res.data!.id);
  });

  it("accepts a comma-separated AprimoAI options list", async () => {
    const res = await aprimo.rules.create({
      enabled: false,
      expression: "",
      includeDraftRecords: false,
      isInternal: false,
      name: `rule AprimoAI ${Date.now() % 100000}`,
      tag: "",
      target: "Record",
      trigger: "WhenSavedOrDeleted",
      conditions: { addOrUpdate: [{ conditionType: "ObjectChanged" }] },
      actions: {
        addOrUpdate: [
          { actionType: "AprimoAI", executionTime: "Delayed", options: "SmartTags,Faces" },
        ],
      },
    });
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    await aprimo.rules.delete(res.data!.id);
  });
});
