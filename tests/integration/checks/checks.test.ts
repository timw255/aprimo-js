import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const fileVersionId = process.env.APRIMO_DAM_FILE_VERSION_ID!;
const actionTypeId = process.env.APRIMO_DAM_TEST_CHECK_ACTION_TYPE_ID!;
const checkCategoryId = process.env.APRIMO_DAM_TEST_CHECK_CATEGORY_ID!;

describe("checks integration", () => {
  let checkId: string;
  let firstCategoryId: string;
  let checkResultId: string;
  let findingId: string;

  it("lists checks", async () => {
    const res = await aprimo.checks.get({ pageSize: 5 });
    expectOk(res);
    logShape("checks.get", res.data);
    expect(res.data?.items).toBeDefined();
  });

  it("lists check categories", async () => {
    const res = await aprimo.checks.getCategories({ pageSize: 5 });
    expectOk(res);
    logShape("checks.getCategories", res.data);
    expect(res.data?.items).toBeDefined();
    firstCategoryId = res.data!.items![0]!.id!;
  });

  it("gets a check category by id", async () => {
    const res = await aprimo.checks.getCategoryById(firstCategoryId);
    expectOk(res);
    logShape("checks.getCategoryById", res.data);
    expect(res.data?.id).toBe(firstCategoryId);
  });

  it("creates a check", async () => {
    const res = await aprimo.checks.create({
      name: `int-test-check-${Date.now()}`,
      actionTypeId,
      checkCategoryId,
    });
    expectOk(res);
    logShape("checks.create", res.data);
    expect(res.data?.id).toBeDefined();
    checkId = res.data!.id!;
  });

  it("gets a check by id", async () => {
    const res = await aprimo.checks.getById(checkId);
    expectOk(res);
    logShape("checks.getById", res.data);
    expect(res.data?.id).toBe(checkId);
  });

  it("updates the check", async () => {
    const res = await aprimo.checks.update(checkId, {
      name: `int-test-check-updated-${Date.now()}`,
      actionTypeId,
      checkCategoryId,
    });
    expectOk(res);
    logShape("checks.update", res.data);
  });

  it("lists check results for a file version", async () => {
    const res = await aprimo.checks.getResults(fileVersionId);
    expectOk(res);
    logShape("checks.getResults", res.data);
  });

  it("creates a check result", async () => {
    const res = await aprimo.checks.createResult(fileVersionId, {
      checkId,
      outcome: "pass",
      description: "integration test result",
    });
    expectOk(res);
    logShape("checks.createResult", res.data);
    expect(res.data?.id).toBeDefined();
    checkResultId = res.data!.id!;
  });

  it("gets the check result by id", async () => {
    const res = await aprimo.checks.getResultById(fileVersionId, checkResultId);
    expectOk(res);
    logShape("checks.getResultById", res.data);
    expect(res.data?.id).toBe(checkResultId);
  });

  it("updates the check result", async () => {
    const res = await aprimo.checks.updateResult(fileVersionId, checkResultId, {
      outcome: "warning",
      description: "updated by integration test",
    });
    expectOk(res);
    logShape("checks.updateResult", res.data);
  });

  it("creates a finding on the check result", async () => {
    const res = await aprimo.checks.createFinding(fileVersionId, checkResultId, {
      occurrence: 1,
      finding: "integration finding",
      outcome: "warning",
      explanation: "test",
      recommendation: "ignore",
    });
    expectOk(res);
    logShape("checks.createFinding", res.data);
    expect(res.data?.id).toBeDefined();
    findingId = res.data!.id!;
  });

  it("lists findings for the check result", async () => {
    const res = await aprimo.checks.getFindings(fileVersionId, checkResultId);
    expectOk(res);
    logShape("checks.getFindings", res.data);
  });

  it("gets a finding by id", async () => {
    const res = await aprimo.checks.getFindingById(
      fileVersionId,
      checkResultId,
      findingId,
    );
    expectOk(res);
    logShape("checks.getFindingById", res.data);
    expect(res.data?.id).toBe(findingId);
  });

  it("updates the finding", async () => {
    const res = await aprimo.checks.updateFinding(
      fileVersionId,
      checkResultId,
      findingId,
      { outcome: "pass" },
    );
    expectOk(res);
    logShape("checks.updateFinding", res.data);
  });

  it("deletes the finding", async () => {
    const res = await aprimo.checks.deleteFinding(
      fileVersionId,
      checkResultId,
      findingId,
    );
    expectOk(res);
    logShape("checks.deleteFinding", res.data);
  });

  it("deletes the check result", async () => {
    const res = await aprimo.checks.deleteResult(fileVersionId, checkResultId);
    expectOk(res);
    logShape("checks.deleteResult", res.data);
  });
});
