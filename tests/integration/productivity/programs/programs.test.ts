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

const programId = Number(process.env.APRIMO_PM_PROGRAM_ID);
const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);

describe("productivity programs integration", () => {
  it("gets programs", async () => {
    const res = await aprimo.productivity.programs.get({ limit: 5 });
    expectOk(res);
    logShape("programs.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets a program by id", async () => {
    const res = await aprimo.productivity.programs.getById(programId);
    expectOk(res);
    logShape("programs.getById", res.data);
    expect(res.data?.programId).toBe(programId);
  });

  it("gets programs for an activity", async () => {
    const res = await aprimo.productivity.programs.getByActivityId(activityId);
    expectOk(res);
    logShape("programs.getByActivityId", res.data);
  });

  it("updates the program", async () => {
    const res = await aprimo.productivity.programs.update(programId, {
      description: "Updated by integration test",
    });
    expectOk(res);
  });
});
