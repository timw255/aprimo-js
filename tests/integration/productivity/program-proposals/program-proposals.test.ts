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

const proposalId = Number(process.env.APRIMO_PM_PROGRAM_PROPOSAL_ID);

describe("productivity programProposals integration", () => {
  it("searches program proposals", async () => {
    const res = await aprimo.productivity.programProposals.search(
      { equals: { fieldName: "proposalType", fieldValue: 2 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("programProposals.search", res.data);
  });

  it("gets a program proposal by id", async () => {
    const res = await aprimo.productivity.programProposals.getById(proposalId);
    expectOk(res);
    logShape("programProposals.getById", res.data);
    expect(res.data?.proposalId).toBe(proposalId);
  });
});
