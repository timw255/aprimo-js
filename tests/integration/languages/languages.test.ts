import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("languages integration", () => {
  let languageId: string;
  const stamp = Date.now().toString(36);
  const testName = `Test Language ${stamp}`;

  it("creates a test language", async () => {
    const existing = await aprimo.languages.get({ pageSize: 100 });
    const stale = existing.data?.items?.find(
      (l) => l.name === testName || l.name === "Test Language" || l.culture === "zz-ZZ",
    );
    if (stale?.id) {
      await aprimo.languages.delete(stale.id);
    }
    const res = await aprimo.languages.create({
      name: testName,
      culture: "zz-ZZ",
      isEnabledForFields: false,
      isEnabledForUI: false,
    });
    expectOk(res);
    logShape("languages.create", res.data);
    expect(res.data?.id).toBeDefined();
    languageId = res.data!.id;
  });

  it("reads the created language", async () => {
    const res = await aprimo.languages.getById(languageId);
    expectOk(res);
    logShape("languages.getById", res.data);
    expect(res.data?.id).toBe(languageId);
  });

  it("updates the test language", async () => {
    const res = await aprimo.languages.update(languageId, {
      isEnabledForFields: true,
    });
    expectOk(res);
    logShape("languages.update", res.data);
    expect(res.status).toBe(204);
  });

  it("gets a list of languages", async () => {
    const res = await aprimo.languages.get({ pageSize: 5 });
    expectOk(res);
    logShape("languages.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches languages paged", async () => {
    let count = 0;
    for await (const page of aprimo.languages.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("languages.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 2) break;
    }
    expect(count).toBeGreaterThan(0);
  });

  it("deletes the test language", async () => {
    const res = await aprimo.languages.delete(languageId);
    expectOk(res);
    logShape("languages.delete", res.data);
    expect(res.status).toBe(204);
  });
});
