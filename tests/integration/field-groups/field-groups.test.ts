import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("fieldGroups integration", () => {
  let id: string;

  it("creates a field group", async () => {
    const res = await aprimo.fieldGroups.create({
      name: `Integration Group ${Date.now()}`,
    });

    expectOk(res);
    logShape("fieldGroups.create", res.data);
    expect(res.data?.id).toBeDefined();
    id = String(res.data!.id);
  });

  it("reads the field group by ID", async () => {
    const res = await aprimo.fieldGroups.getById(id);
    expectOk(res);
    logShape("fieldGroups.getById", res.data);
    expect(res.data?.id).toBe(id);
  });

  it("updates the field group", async () => {
    const res = await aprimo.fieldGroups.update(id, {
      name: `Updated Integration Group ${Date.now()}`,
    });

    expectOk(res);
    logShape("fieldGroups.update", res.data);
  });

  it("fetches field groups list", async () => {
    const res = await aprimo.fieldGroups.get({ pageSize: 5 });
    expectOk(res);
    logShape("fieldGroups.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches field groups paged", async () => {
    let count = 0;

    for await (const page of aprimo.fieldGroups.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("fieldGroups.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the field group", async () => {
    const res = await aprimo.fieldGroups.delete(id);
    expectOk(res);
    logShape("fieldGroups.delete", res.data);
  });
});
