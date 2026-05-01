import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const cellId = Number(process.env.APRIMO_PM_ACTIVITY_CELL_ID);
const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);
const treatmentId = Number(process.env.APRIMO_PM_TREATMENT_ID);

describe("productivity activityCellTreatments integration", () => {
  let activityTreatmentId: number;
  let cellTreatmentId: number;

  beforeAll(async () => {
    const list =
      await aprimo.productivity.activityTreatments.getByActivityId(activityId);
    const items =
      (list.data?._embedded as
        | { "activity-treatments"?: { activityTreatmentId?: number; treatmentId?: number }[] }
        | undefined)?.["activity-treatments"] ?? [];
    const existing = items.find((i) => i.treatmentId === treatmentId);
    if (existing?.activityTreatmentId) {
      activityTreatmentId = existing.activityTreatmentId;
    } else {
      const created = await aprimo.productivity.activityTreatments.create({
        activityId,
        treatmentId,
      });
      activityTreatmentId = created.data!.activityTreatmentId!;
    }
  });

  it("creates an activity-cell-treatment", async () => {
    const res = await aprimo.productivity.activityCellTreatments.create({
      activityCellId: cellId,
      activityTreatmentId,
      cellPercentage: 100,
      estResponseRatePercent: 0,
      sequence: 1,
    });
    expectOk(res);
    logShape("activityCellTreatments.create", res.data);
    expect(res.data?.activityCellTreatmentId).toBeDefined();
    cellTreatmentId = res.data!.activityCellTreatmentId!;
  });

  it("lists treatments for the cell", async () => {
    const res = await aprimo.productivity.activityCellTreatments.getByCellId(cellId);
    expectOk(res);
    logShape("activityCellTreatments.getByCellId", res.data);
  });

  it("gets a cell-treatment by id", async () => {
    const res = await aprimo.productivity.activityCellTreatments.getById(
      cellTreatmentId,
    );
    expectOk(res);
    logShape("activityCellTreatments.getById", res.data);
    expect(res.data?.activityCellTreatmentId).toBe(cellTreatmentId);
  });

  it("updates the cell-treatment", async () => {
    const current =
      await aprimo.productivity.activityCellTreatments.getById(cellTreatmentId);
    expectOk(current);
    const res = await aprimo.productivity.activityCellTreatments.update(
      cellTreatmentId,
      {
        ...(current.data as unknown as Record<string, unknown>),
        activityCellTreatmentId: cellTreatmentId,
        cellPercentage: 50,
      },
    );
    expectOk(res);
  });

  it("deletes the cell-treatment", async () => {
    const res = await aprimo.productivity.activityCellTreatments.delete(
      cellTreatmentId,
    );
    expectOk(res);
  });
});
