import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
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
    expect(res.data?.id).toBeDefined();
    id = String(res.data!.id);
  });

  it("reads the field group by ID", async () => {
    const res = await aprimo.fieldGroups.getById(id);
    expectOk(res);
    expect(res.data?.id).toBe(id);
  });

  it("updates the field group", async () => {
    const res = await aprimo.fieldGroups.update(id, {
      name: "Updated Integration Group",
    });

    expectOk(res);
  });

  it("fetches field groups list", async () => {
    const res = await aprimo.fieldGroups.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches field groups paged", async () => {
    let count = 0;

    for await (const page of aprimo.fieldGroups.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the field group", async () => {
    const res = await aprimo.fieldGroups.delete(id);
    expectOk(res);
  });
});
