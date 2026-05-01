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

const eaId = process.env.APRIMO_PM_EXTENDED_ATTRIBUTE_ID!;
const childEaId = process.env.APRIMO_PM_EXTENDED_ATTRIBUTE_CHILD_ID!;
const parentItemId = process.env.APRIMO_PM_EXTENDED_ATTRIBUTE_PARENT_ITEM_ID!;

describe("productivity extendedAttributeOptions integration", () => {
  it("gets picklist options for an extended attribute", async () => {
    const res =
      await aprimo.productivity.extendedAttributeOptions.getPicklistOptions(eaId);
    expectOk(res);
    logShape("extendedAttributeOptions.getPicklistOptions", res.data);
    expect(res.data?.items).toBeDefined();
  });

  it("updates picklist options on an extended attribute", async () => {
    const current =
      await aprimo.productivity.extendedAttributeOptions.getPicklistOptions(eaId);
    expectOk(current);
    const items = current.data?.items ?? [];
    const res =
      await aprimo.productivity.extendedAttributeOptions.updatePicklistOptions(
        eaId,
        { items },
      );
    expectOk(res);
  });

  it("gets allowed children for a parent picklist item", async () => {
    const res =
      await aprimo.productivity.extendedAttributeOptions.getAllowedChildren(
        childEaId,
        parentItemId,
      );
    expectOk(res);
    logShape("extendedAttributeOptions.getAllowedChildren", res.data);
  });

  it("updates allowed children for a parent picklist item", async () => {
    const current =
      await aprimo.productivity.extendedAttributeOptions.getAllowedChildren(
        childEaId,
        parentItemId,
      );
    expectOk(current);
    const items = current.data?.items ?? [];
    const res =
      await aprimo.productivity.extendedAttributeOptions.updateAllowedChildren(
        childEaId,
        parentItemId,
        { items },
      );
    expectOk(res);
  });
});
