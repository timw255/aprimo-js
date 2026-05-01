import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getTenantDefaults, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity users integration", () => {
  let userId: number;
  let loginId: string;

  it("creates a user", async () => {
    const defaults = await getTenantDefaults(aprimo);
    loginId = `int_test_${Date.now()}`;
    const res = await aprimo.productivity.users.create({
      loginId,
      email: `${loginId}@example.com`,
      lastName: "IntegrationTest",
      firstName: "PM",
      userType: defaults.userTypeId,
      currencyCode: defaults.currencyCode,
      laborRateCurrencyCode: defaults.currencyCode,
      languageId: defaults.languageId,
      localeId: 1,
      autoSave: 0,
      dateFormat: 1,
      timeFormat: 1,
      numberFormatId: 1,
      timezoneId: 1,
      paperSize: 1,
      htmlEmail: true,
      analyzeAllDomains: 0,
      isPinReset: 0,
      passwordExpires: 0,
      adHocUser: false,
      activeFlag: 1,
      applicationUser: true,
      portalUser: true,
      reviewUser: true,
      isOutOfOffice: false,
      clientLoggingLevel: 0,
    });
    expectOk(res);
    logShape("users.create", res.data);
    expect(res.data?.userId).toBeDefined();
    userId = res.data!.userId;
  });

  it("gets the current user", async () => {
    const res = await aprimo.productivity.users.getMe();
    expectOk(res);
    logShape("users.getMe", res.data);
    expect(res.data?.userId).toBeDefined();
  });

  it("gets annotation users", async () => {
    const res = await aprimo.productivity.users.getAnnotationUsers();
    expectOk(res);
    logShape("users.getAnnotationUsers", res.data);
  });

  it("gets the test user by id", async () => {
    const res = await aprimo.productivity.users.getById(userId);
    expectOk(res);
    logShape("users.getById", res.data);
    expect(res.data?.userId).toBe(userId);
    expect(res.data?.loginId).toBe(loginId);
  });

  it("updates the test user", async () => {
    const res = await aprimo.productivity.users.update(userId, {
      lastName: "IntegrationTestUpdated",
    });
    expectOk(res);
  });

  it("searches users", async () => {
    const res = await aprimo.productivity.users.search(
      { equals: { fieldName: "activeFlag", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("users.search", res.data);
  });

  it("resets the test user's pin", async () => {
    const res = await aprimo.productivity.users.resetPin(userId);
    expectOk(res);
  });

  it("deletes the test user", async () => {
    const res = await aprimo.productivity.users.delete(userId);
    expectOk(res);
  });
});
