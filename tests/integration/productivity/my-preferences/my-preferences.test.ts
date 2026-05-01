import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity myPreferences integration", () => {
  it("gets region preferences", async () => {
    const res = await aprimo.productivity.myPreferences.getRegion();
    expectOk(res);
    logShape("myPreferences.getRegion", res.data);
    expect(res.data?.localeId).toBeDefined();
  });

  it("updates region preferences with current values", async () => {
    const getRes = await aprimo.productivity.myPreferences.getRegion();
    expectOk(getRes);

    const current = getRes.data!;
    const res = await aprimo.productivity.myPreferences.updateRegion({
      localeId: current.localeId,
      languageId: current.languageId,
      dateFormat: current.dateFormat,
      timeFormat: current.timeFormat,
      numberFormatId: current.numberFormatId,
      timezoneId: current.timezoneId,
      currencyCode: current.currencyCode,
      paperSize: current.paperSize,
      autoSave: current.autoSave,
      themeId: current.themeId,
    });
    expectOk(res);
    logShape("myPreferences.updateRegion", res.data);
  });
});
