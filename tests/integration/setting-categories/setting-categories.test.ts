import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("settingCategories integration", () => {
  let id: string;

  it("creates a setting category", async () => {
    const res = await aprimo.settingCategories.create({
      name: `Integration Setting Category ${Date.now()}`,
      labels: [
        {
          languageId: "C2BD4F9B-BB95-4BCB-80C3-1E924C9C26DC",
          value: "Integration Test Label",
        },
      ],
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("reads the setting category", async () => {
    const res = await aprimo.settingCategories.getById(id);
    expectOk(res);
    expect(res.data?.id).toBeDefined();
  });

  it("fetches a list of setting categories", async () => {
    const res = await aprimo.settingCategories.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged setting categories", async () => {
    let count = 0;

    for await (const page of aprimo.settingCategories.getPaged({
      pageSize: 2,
    })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the setting category", async () => {
    const res = await aprimo.settingCategories.delete(id);
    expectOk(res);
  });
});
