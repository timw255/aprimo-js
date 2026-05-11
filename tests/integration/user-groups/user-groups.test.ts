import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("user groups integration", () => {
  let userGroupId: string;

  it("creates a user group", async () => {
    const res = await aprimo.userGroups.create({
      name: `Integration Test Group ${Date.now()}`,
    });

    expectOk(res);
    logShape("userGroups.create", res.data);
    expect(res.data?.id).toBeDefined();
    userGroupId = res.data!.id;
  });

  it("gets a user group by ID", async () => {
    const res = await aprimo.userGroups.getById(userGroupId);
    expectOk(res);
    logShape("userGroups.getById", res.data);
    expect(res.data?.id).toBe(userGroupId);
  });

  it("updates a user group", async () => {
    const updateRes = await aprimo.userGroups.update(userGroupId, {
      name: `Updated Test Group ${Date.now()}`,
    });

    expectOk(updateRes);
    logShape("userGroups.update", updateRes.data);
  });

  it("fetches a list of user groups", async () => {
    const res = await aprimo.userGroups.get({ pageSize: 5 });
    expectOk(res);
    logShape("userGroups.get", res.data);
    expect(res.data?.items.length).toBeGreaterThan(0);
  });

  it("fetches user groups paged", async () => {
    let count = 0;

    for await (const page of aprimo.userGroups.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("userGroups.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("gets permissions for a user group", async () => {
    const res = await aprimo.userGroups.getPermissions(userGroupId);
    expectOk(res);
    logShape("userGroups.getPermissions", res.data);
    expect(res.data?.items).toBeDefined();
  });

  it("updates permissions for a user group", async () => {
    const permsRes = await aprimo.userGroups.getPermissions(userGroupId);
    expectOk(permsRes);
    logShape("userGroups.getPermissions", permsRes.data);

    const permissionName = permsRes.data?.items?.[0]?.name;
    expect(permissionName).toBeDefined();

    const updateRes = await aprimo.userGroups.updatePermissions(userGroupId, {
      permissions: {
        addOrUpdate: [
          {
            name: permissionName!,
            value: "granted",
          },
        ],
      },
    });

    expectOk(updateRes);
    logShape("userGroups.updatePermissions", updateRes.data);

    const verifyRes = await aprimo.userGroups.getPermissions(userGroupId);
    expectOk(verifyRes);
    logShape("userGroups.getPermissions:verify", verifyRes.data);

    const updatedPerm = verifyRes.data?.items?.find(
      (p) => p.name === permissionName,
    );
    expect(updatedPerm?.value?.toLowerCase()).toBe("granted");
  });

  it("deletes the user group", async () => {
    const res = await aprimo.userGroups.delete(userGroupId);
    expectOk(res);
    logShape("userGroups.delete", res.data);
  });
});
