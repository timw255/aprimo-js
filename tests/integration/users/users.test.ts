import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("users integration", () => {
  let userId: string;

  it("creates a user", async () => {
    const res = await aprimo.users.create({
      name: `integration-${Date.now()}`,
      email: `integration+${Date.now()}@example.com`,
      firstName: "Integration",
      lastName: "User",
    });

    expectOk(res);
    logShape("users.create", res.data);
    expect(res.data?.id).toBeDefined();
    userId = res.data!.id;
  });

  it("gets a user by ID", async () => {
    const res = await aprimo.users.getById(userId);
    expectOk(res);
    logShape("users.getById", res.data);
    expect(res.data?.id).toBe(userId);
  });

  it("updates the user", async () => {
    const res = await aprimo.users.update(userId, {
      firstName: "Updated",
    });

    expectOk(res);
    logShape("users.update", res.data);
  });

  it("gets a page of users", async () => {
    const res = await aprimo.users.get({ pageSize: 5 });
    expectOk(res);
    logShape("users.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches users paged", async () => {
    let count = 0;

    for await (const page of aprimo.users.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("users.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("gets permissions for a user", async () => {
    const res = await aprimo.users.getPermissions(userId);
    expectOk(res);
    logShape("users.getPermissions", res.data);
    expect(res.data?.items).toBeDefined();
  });

  it("updates permissions for a user", async () => {
    const permsRes = await aprimo.users.getPermissions(userId);
    expectOk(permsRes);
    logShape("users.getPermissions", permsRes.data);

    const permissionName = permsRes.data?.items?.[0]?.name;
    expect(permissionName).toBeDefined();

    const updateRes = await aprimo.users.updatePermissions(userId, {
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
    logShape("users.updatePermissions", updateRes.data);

    const verifyRes = await aprimo.users.getPermissions(userId);
    expectOk(verifyRes);
    logShape("users.getPermissions:verify", verifyRes.data);

    const updatedPerm = verifyRes.data?.items?.find(
      (p) => p.name === permissionName,
    );
    expect(updatedPerm?.value?.toLowerCase()).toBe("granted");
  });

  it("deletes the user", async () => {
    const res = await aprimo.users.delete(userId);
    expectOk(res);
    logShape("users.delete", res.data);
  });
});
