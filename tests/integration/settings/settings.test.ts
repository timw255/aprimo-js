import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const TEST_SETTING = ".defaultRecordTitleField";
const SECOND_SETTING = ".defaultLanguageForUI";

describe("settings integration", () => {
  it("gets a single setting", async () => {
    const res = await aprimo.settings.getByName(TEST_SETTING);
    expectOk(res);

    expect(res.data?.name).toBe(TEST_SETTING);
    expect(res.data?.value).toBeDefined();
  });

  it("gets multiple settings", async () => {
    const res = await aprimo.settings.getByName([TEST_SETTING, SECOND_SETTING]);
    expectOk(res);

    const names = res.data?.items.map((s) => s.name);
    expect(names).toContain(TEST_SETTING);
    expect(names).toContain(SECOND_SETTING);
  });

  it("gets a scoped setting (user)", async () => {
    const res = await aprimo.settings.getByName(TEST_SETTING, "system");
    expectOk(res);

    expect(res.data?.name).toBe(TEST_SETTING);
  });

  it("throws if scopeId is missing for site/usergroup scope", async () => {
    await expect(() =>
      aprimo.settings.update({
        name: TEST_SETTING,
        value: "SomeValue",
        scope: "site", // missing scopeId
      }),
    ).rejects.toThrow("scopeId is required when scope is 'site'");
  });

  it("updates a setting with its current value", async () => {
    // Get current system-scoped setting value
    const getRes = await aprimo.settings.getByName(TEST_SETTING, "system");
    expectOk(getRes);

    const currentValue = getRes.data?.value as string;
    expect(currentValue).toBeDefined();

    // Re-apply the same value
    const updateRes = await aprimo.settings.update({
      name: TEST_SETTING,
      value: currentValue,
      scope: "system",
    });

    expectOk(updateRes);
  });
});
