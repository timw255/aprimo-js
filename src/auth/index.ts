import axios, { AxiosError } from "axios";

export async function getClientCredentialsToken(
  environment: string,
  clientId: string,
  clientSecret: string,
): Promise<string> {
  try {
    const response = await axios.post(
      `https://${environment}.aprimo.com/login/connect/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "api",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    return response.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Client credentials auth failed: ${error.response?.status} ${error.response?.statusText}`,
      );
    }

    throw new Error(
      "Unexpected error during client credentials authentication",
    );
  }
}

export async function getPasswordToken(
  environment: string,
  clientId: string,
  clientSecret: string,
  username: string,
  password: string,
): Promise<string> {
  try {
    const response = await axios.post(
      `https://${environment}.aprimo.com/login/connect/token`,
      new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
        scope: "api",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    return response.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Password flow auth failed: ${error.response?.status} ${error.response?.statusText}`,
      );
    }

    throw new Error("Unexpected error during password authentication");
  }
}
