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

const groupId = Number(process.env.APRIMO_PM_GROUP_ID);

describe("productivity groupMemberships integration", () => {
  it("gets memberships for the test group", async () => {
    const res = await aprimo.productivity.groupMemberships.getByGroupId(groupId);
    expectOk(res);
    logShape("groupMemberships.getByGroupId", res.data);
    expect(res.data).toBeDefined();
  });
});
