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

const teamId = Number(process.env.APRIMO_PM_TEAM_ID);

describe("productivity teams integration", () => {
  it("gets teams", async () => {
    const res = await aprimo.productivity.teams.get({ limit: 5 });
    expectOk(res);
    logShape("teams.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets a team by id", async () => {
    const res = await aprimo.productivity.teams.getById(teamId);
    expectOk(res);
    logShape("teams.getById", res.data);
    expect(res.data?.teamId).toBeDefined();
  });
});
