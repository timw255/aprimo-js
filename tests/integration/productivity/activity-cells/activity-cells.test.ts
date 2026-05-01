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

describe("productivity activityCells integration", () => {
  let cellId: number;

  it("creates a cell under the test activity", async () => {
    const res = await aprimo.productivity.activityCells.create({
      title: `int-test-cell-${Date.now()}`,
      description: "Integration test fixture",
      activityId,
      estimatedQuantity: 100,
      actualQuantity: 0,
      actualResponse: 0,
    });
    expectOk(res);
    logShape("activityCells.create", res.data);
    expect(res.data?.activityCellId).toBeDefined();
    cellId = res.data!.activityCellId!;
  });

  it("lists cells for the activity", async () => {
    const res =
      await aprimo.productivity.activityCells.getByActivityId(activityId);
    expectOk(res);
    logShape("activityCells.getByActivityId", res.data);
  });

  it("gets the cell by id", async () => {
    const res = await aprimo.productivity.activityCells.getById(cellId);
    expectOk(res);
    logShape("activityCells.getById", res.data);
    expect(res.data?.activityCellId).toBe(cellId);
  });

  it("updates the cell", async () => {
    const res = await aprimo.productivity.activityCells.update(cellId, {
      activityCellId: cellId,
      activityId,
      title: `int-test-cell-${Date.now()}`,
      description: "Updated",
    });
    expectOk(res);
  });

  it("deletes the cell", async () => {
    const res = await aprimo.productivity.activityCells.delete(cellId);
    expectOk(res);
  });
});
