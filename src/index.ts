import { Aprimo } from "./client";
import {
  cacheTokenProvider,
  getClientCredentialsToken,
  getPasswordToken,
} from "./auth";

export type AuthStrategy =
  | { type: "client_credentials"; clientId: string; clientSecret: string }
  | {
      type: "password";
      clientId: string;
      clientSecret: string;
      username: string;
      password: string;
    }
  | { type: "custom"; tokenProvider: () => Promise<string> };

export type CreateClientOptions = {
  environment: string;
} & AuthStrategy;

export function createClient(options: CreateClientOptions): Aprimo {
  const { environment } = options;

  let tokenProvider: () => Promise<string>;

  if (options.type === "client_credentials") {
    const { clientId, clientSecret } = options;
    tokenProvider = cacheTokenProvider(() =>
      getClientCredentialsToken(environment, clientId, clientSecret),
    );
  } else if (options.type === "password") {
    const { clientId, clientSecret, username, password } = options;
    tokenProvider = cacheTokenProvider(() =>
      getPasswordToken(environment, clientId, clientSecret, username, password),
    );
  } else if (options.type === "custom") {
    tokenProvider = options.tokenProvider;
  } else {
    throw new Error("Invalid authentication strategy");
  }

  return new Aprimo(environment, tokenProvider);
}

export { Aprimo };
export { computeSetActions } from "./utils";
export { Expander } from "./expander";
