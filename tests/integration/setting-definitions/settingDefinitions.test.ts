import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("settingDefinitions integration", () => {
  let settingDefinitionId: string;
  let settingCategoryId: string;

  it("creates a setting category", async () => {
    const res = await aprimo.settingCategories.create({
      name: `IntegrationTestCategory_${Date.now()}`,
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    settingCategoryId = res.data!.id;
  });

  it("creates a text setting definition", async () => {
    const res = await aprimo.settingDefinitions.create({
      name: `IntegrationTestSetting_${Date.now()}`,
      categoryId: settingCategoryId,
      allowSystemSetting: true,
      allowAnonymousAccess: false,
      allowUserSetting: false,
      dataType: "text",
      defaultValue: "Default",
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    settingDefinitionId = res.data!.id;
  });

  it("reads the setting definition", async () => {
    const res = await aprimo.settingDefinitions.getById(settingDefinitionId);
    expectOk(res);
    expect(res.data?.id).toBeDefined();
  });

  it("fetches a list of setting definitions", async () => {
    const res = await aprimo.settingDefinitions.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged setting definitions", async () => {
    let count = 0;

    for await (const page of aprimo.settingDefinitions.getPaged({
      pageSize: 2,
    })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the setting definition", async () => {
    const res = await aprimo.settingDefinitions.delete(settingDefinitionId);
    expectOk(res);
  });

  it("deletes the setting category", async () => {
    const res = await aprimo.settingCategories.delete(settingCategoryId);
    expectOk(res);
  });
});
