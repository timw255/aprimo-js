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
const projectId = Number(process.env.APRIMO_PM_PROJECT_ID);

describe("productivity projects integration", () => {
  it("gets projects", async () => {
    const res = await aprimo.productivity.projects.get({ limit: 5 });
    expectOk(res);
    logShape("projects.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets a project by id", async () => {
    const res = await aprimo.productivity.projects.getById(projectId);
    expectOk(res);
    logShape("projects.getById", res.data);
    expect(res.data?.projectId).toBe(projectId);
  });

  it("gets projects for an activity", async () => {
    const res = await aprimo.productivity.projects.getByActivityId(activityId);
    expectOk(res);
    logShape("projects.getByActivityId", res.data);
  });

  it("gets attachments for a project", async () => {
    const res = await aprimo.productivity.projects.getAttachments(projectId);
    expectOk(res);
    logShape("projects.getAttachments", res.data);
  });

  it("gets digital assets for a project", async () => {
    const res = await aprimo.productivity.projects.getDigitalAssets(projectId);
    expectOk(res);
    logShape("projects.getDigitalAssets", res.data);
  });
});
