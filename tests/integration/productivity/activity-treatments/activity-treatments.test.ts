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

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);
const treatmentId = Number(process.env.APRIMO_PM_TREATMENT_ID);

describe("productivity activityTreatments integration", () => {
  let activityTreatmentId: number;

  beforeAll(async () => {
    const list =
      await aprimo.productivity.activityTreatments.getByActivityId(activityId);
    const items =
      (list.data?._embedded as
        | { "activity-treatments"?: { activityTreatmentId?: number; treatmentId?: number }[] }
        | undefined)?.["activity-treatments"] ?? [];
    const existing = items.find((i) => i.treatmentId === treatmentId);
    if (existing?.activityTreatmentId) {
      await aprimo.productivity.activityTreatments
        .delete(existing.activityTreatmentId)
        .catch(() => {});
    }
  });

  it("creates an activity-treatment link", async () => {
    const res = await aprimo.productivity.activityTreatments.create({
      activityId,
      treatmentId,
    });
    expectOk(res);
    logShape("activityTreatments.create", res.data);
    expect(res.data?.activityTreatmentId).toBeDefined();
    activityTreatmentId = res.data!.activityTreatmentId!;
  });

  it("lists treatments for an activity", async () => {
    const res =
      await aprimo.productivity.activityTreatments.getByActivityId(activityId);
    expectOk(res);
    logShape("activityTreatments.getByActivityId", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the activity-treatment by id", async () => {
    const res =
      await aprimo.productivity.activityTreatments.getById(activityTreatmentId);
    expectOk(res);
    logShape("activityTreatments.getById", res.data);
    expect(res.data?.activityTreatmentId).toBe(activityTreatmentId);
  });

  it("updates the activity-treatment", async () => {
    const current =
      await aprimo.productivity.activityTreatments.getById(activityTreatmentId);
    expectOk(current);
    const res = await aprimo.productivity.activityTreatments.update(
      activityTreatmentId,
      {
        ...(current.data as unknown as Record<string, unknown>),
        activityTreatmentId,
        activityId,
        treatmentId,
      },
    );
    expectOk(res);
  });

  it("deletes the activity-treatment", async () => {
    const res =
      await aprimo.productivity.activityTreatments.delete(activityTreatmentId);
    expectOk(res);
  });
});
