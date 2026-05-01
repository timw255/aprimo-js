import { describe, it } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity metadata integration", () => {
  it("gets metadata for an object name", async () => {
    const res = await aprimo.productivity.metadata.getByName("user");
    expectOk(res);
    logShape("metadata.getByName(user)", res.data);
  });
});
