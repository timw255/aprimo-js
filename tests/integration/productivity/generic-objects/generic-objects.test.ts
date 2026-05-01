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

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);

describe("productivity genericObjects integration", () => {
  let alphaId: number;

  it("creates a generic-object-alpha", async () => {
    const res = await aprimo.productivity.genericObjects.create("alpha", {
      name: `int-test-go-${Date.now()}`,
      description: "Integration test fixture",
      relatedObjectId: activityId,
    });
    expectOk(res);
    logShape("genericObjects.create(alpha)", res.data);
    expect(res.data?.id).toBeDefined();
    alphaId = res.data!.id!;
  });

  it("gets generic-object-alpha entries", async () => {
    const res = await aprimo.productivity.genericObjects.get("alpha", { limit: 5 });
    expectOk(res);
    logShape("genericObjects.get(alpha)", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test alpha object by id", async () => {
    const res = await aprimo.productivity.genericObjects.getById("alpha", alphaId);
    expectOk(res);
    logShape("genericObjects.getById(alpha)", res.data);
    expect(res.data?.id).toBe(alphaId);
  });

  it("updates the test alpha object", async () => {
    const res = await aprimo.productivity.genericObjects.update("alpha", alphaId, {
      id: alphaId,
      name: `int-test-go-updated-${Date.now()}`,
      relatedObjectId: activityId,
    });
    expectOk(res);
  });

  it("searches generic-object-alpha", async () => {
    const res = await aprimo.productivity.genericObjects.search(
      "alpha",
      { contains: { fieldName: "name", fieldValue: "int-test-go" } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("genericObjects.search(alpha)", res.data);
  });

  it("deletes the test alpha object", async () => {
    const res = await aprimo.productivity.genericObjects.delete("alpha", alphaId);
    expectOk(res);
  });
});
