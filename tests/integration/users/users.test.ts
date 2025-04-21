import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

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
    expect(res.data?.id).toBeDefined();
    userId = res.data!.id;
  });

  it("gets a user by ID", async () => {
    const res = await aprimo.users.getById(userId);
    expectOk(res);
    expect(res.data?.id).toBe(userId);
  });

  it("updates the user", async () => {
    const res = await aprimo.users.update(userId, {
      firstName: "Updated",
    });

    expectOk(res);
  });

  it("gets a page of users", async () => {
    const res = await aprimo.users.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("deletes the user", async () => {
    const res = await aprimo.users.delete(userId);
    expectOk(res);
  });
});
