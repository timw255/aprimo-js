import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("user groups integration", () => {
  let userGroupId: string;

  it("fetches a list of user groups", async () => {
    const res = await aprimo.userGroups.get({ pageSize: 2 });

    expect(res.data?.items.length).toBeGreaterThan(0);

    userGroupId = res.data!.items[0].id;
  });

  it("gets a user group by ID", async () => {
    const res = await aprimo.userGroups.getById(userGroupId);
    expectOk(res);
    expect(res.data?.id).toBe(userGroupId);
  });

  it("updates a user group with the same data", async () => {
    const original = await aprimo.userGroups.getById(userGroupId);
    expectOk(original);

    const data = original.data!;
    const updateRes = await aprimo.userGroups.update(userGroupId, {
      name: data.name,
    });

    expectOk(updateRes);
  });
});
