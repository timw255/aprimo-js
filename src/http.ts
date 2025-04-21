import axios, { AxiosRequestConfig } from "axios";
import { ApiResult } from "./client";

export class HttpClient {
  constructor(
    private tokenProvider: () => Promise<string>,
    private baseUrl: string,
    private baseHeaders: Record<string, string> = {},
  ) {}

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    body?: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResult<T>> {
    const token = await this.tokenProvider();
    const isFormData = body instanceof FormData;

    const config: AxiosRequestConfig = {
      method,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...this.baseHeaders,
        ...headers,
      },
      data: body,
    };

    try {
      const response = await axios.request<T>(config);
      return { ok: true, status: response.status, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const data = error.response?.data;

        return {
          ok: false,
          status,
          error: {
            type: data?.exceptionType ?? "HttpError",
            message: data?.exceptionMessage || error.message,
            raw: data,
          },
        };
      }

      return {
        ok: false,
        status: 500,
        error: {
          type: "UnknownError",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          raw: error,
        },
      };
    }
  }

  get<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>("GET", url, undefined, headers);
  }

  post<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>("POST", url, body, headers);
  }

  put<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>("PUT", url, body, headers);
  }

  delete<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>("DELETE", url, undefined, headers);
  }
}
