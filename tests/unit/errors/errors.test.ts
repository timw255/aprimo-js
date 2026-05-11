import { describe, expect, it } from "vitest";
import {
  AprimoAuthConfigError,
  AprimoAuthCredentialsError,
  AprimoAuthError,
  AprimoBadRequestError,
  AprimoCancelledError,
  AprimoConfigError,
  AprimoConflictError,
  AprimoError,
  AprimoForbiddenError,
  AprimoHttpError,
  AprimoNetworkError,
  AprimoNotFoundError,
  AprimoRateLimitError,
  AprimoServerError,
  AprimoTimeoutError,
  AprimoUnauthorizedError,
  AprimoUploadCommitError,
  AprimoUploadError,
  AprimoUploadSegmentError,
  AprimoUploadSetupError,
  AprimoValidationError,
  isAprimoAuthError,
  isAprimoCancelledError,
  isAprimoConfigError,
  isAprimoError,
  isAprimoHttpError,
  isAprimoNetworkError,
  isAprimoTimeoutError,
  isAprimoUploadError,
} from "../../../src/errors";

describe("AprimoError", () => {
  it("is an Error subclass", () => {
    const err = new AprimoError("oops", "Generic");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.name).toBe("AprimoError");
    expect(err.message).toBe("oops");
    expect(err.type).toBe("Generic");
  });

  it("preserves cause and exposes raw for backward compat", () => {
    const cause = new Error("upstream");
    const err = new AprimoError("wrapped", "Generic", { cause });
    expect(err.cause).toBe(cause);
    expect(err.raw).toBe(cause);
  });

  it("lets raw override cause", () => {
    const cause = new Error("upstream");
    const raw = { somethingElse: true };
    const err = new AprimoError("wrapped", "Generic", { cause, raw });
    expect(err.cause).toBe(cause);
    expect(err.raw).toBe(raw);
  });
});

describe("HTTP error hierarchy", () => {
  const baseOpts = {
    status: 400,
    aprimoErrorCode: "Some.Code",
    responseBody: { exceptionMessage: "details" },
  };

  it("AprimoBadRequestError is also AprimoHttpError and AprimoError", () => {
    const err = new AprimoBadRequestError("bad", baseOpts);
    expect(err).toBeInstanceOf(AprimoBadRequestError);
    expect(err).toBeInstanceOf(AprimoHttpError);
    expect(err).toBeInstanceOf(AprimoError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("AprimoBadRequestError");
    expect(err.type).toBe("BadRequest");
    expect(err.status).toBe(400);
    expect(err.aprimoErrorCode).toBe("Some.Code");
    expect(err.responseBody).toEqual({ exceptionMessage: "details" });
  });

  it.each([
    [AprimoUnauthorizedError, "Unauthorized", 401],
    [AprimoForbiddenError, "Forbidden", 403],
    [AprimoNotFoundError, "NotFound", 404],
    [AprimoConflictError, "Conflict", 409],
    [AprimoValidationError, "ValidationError", 422],
    [AprimoServerError, "ServerError", 500],
  ])("%s carries the right type and inherits from AprimoHttpError", (Cls, type, status) => {
    const err = new (Cls as new (msg: string, opts: typeof baseOpts) => AprimoHttpError)(
      "msg",
      { ...baseOpts, status },
    );
    expect(err.type).toBe(type);
    expect(err.status).toBe(status);
    expect(err).toBeInstanceOf(AprimoHttpError);
    expect(err).toBeInstanceOf(AprimoError);
  });

  it("AprimoRateLimitError surfaces retryAfter", () => {
    const err = new AprimoRateLimitError("slow down", {
      status: 429,
      retryAfter: "30",
      responseBody: { exceptionMessage: "Rate limit hit" },
    });
    expect(err.type).toBe("RateLimit");
    expect(err.status).toBe(429);
    expect(err.retryAfter).toBe("30");
    expect(err).toBeInstanceOf(AprimoHttpError);
  });

  it("generic AprimoHttpError defaults type to HttpError", () => {
    const err = new AprimoHttpError("misc", { status: 418 });
    expect(err.type).toBe("HttpError");
  });
});

describe("Transport errors", () => {
  it("AprimoNetworkError", () => {
    const err = new AprimoNetworkError("offline");
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.type).toBe("NetworkError");
    expect(err.name).toBe("AprimoNetworkError");
  });

  it("AprimoTimeoutError", () => {
    const err = new AprimoTimeoutError("too slow");
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.type).toBe("TimeoutError");
  });

  it("AprimoCancelledError preserves the legacy AbortError type string", () => {
    const err = new AprimoCancelledError("user cancelled");
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.type).toBe("AbortError");
  });
});

describe("Auth errors", () => {
  it("AprimoAuthCredentialsError carries status and inherits from AprimoAuthError", () => {
    const cause = new Error("axios fail");
    const err = new AprimoAuthCredentialsError("bad password", {
      status: 401,
      cause,
    });
    expect(err).toBeInstanceOf(AprimoAuthError);
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.type).toBe("AuthCredentialsError");
    expect(err.status).toBe(401);
    expect(err.cause).toBe(cause);
  });

  it("AprimoAuthConfigError inherits from AprimoAuthError", () => {
    const err = new AprimoAuthConfigError("missing client id");
    expect(err).toBeInstanceOf(AprimoAuthError);
    expect(err.type).toBe("AuthConfigError");
  });
});

describe("Upload errors", () => {
  it("AprimoUploadSetupError preserves the legacy UploadSetupFailed type string", () => {
    const err = new AprimoUploadSetupError("setup failed");
    expect(err).toBeInstanceOf(AprimoUploadError);
    expect(err.type).toBe("UploadSetupFailed");
  });

  it("AprimoUploadSegmentError carries segmentIndex and the legacy type string", () => {
    const err = new AprimoUploadSegmentError("segment 4 failed", {
      segmentIndex: 4,
    });
    expect(err).toBeInstanceOf(AprimoUploadError);
    expect(err.type).toBe("UploadSegmentFailed");
    expect(err.segmentIndex).toBe(4);
  });

  it("AprimoUploadCommitError preserves the legacy UploadCommitFailed type string", () => {
    const err = new AprimoUploadCommitError("commit failed");
    expect(err).toBeInstanceOf(AprimoUploadError);
    expect(err.type).toBe("UploadCommitFailed");
  });
});

describe("AprimoConfigError", () => {
  it("inherits from AprimoError, type is ConfigError", () => {
    const err = new AprimoConfigError("bad scope");
    expect(err).toBeInstanceOf(AprimoError);
    expect(err.type).toBe("ConfigError");
  });
});

describe("type guards", () => {
  it("isAprimoError narrows to AprimoError", () => {
    expect(isAprimoError(new AprimoError("x", "Y"))).toBe(true);
    expect(isAprimoError(new AprimoBadRequestError("x", { status: 400 }))).toBe(true);
    expect(isAprimoError(new Error("plain"))).toBe(false);
    expect(isAprimoError(undefined)).toBe(false);
    expect(isAprimoError("string")).toBe(false);
  });

  it("isAprimoHttpError only matches HTTP-family errors", () => {
    expect(isAprimoHttpError(new AprimoBadRequestError("x", { status: 400 }))).toBe(true);
    expect(isAprimoHttpError(new AprimoNetworkError("x"))).toBe(false);
    expect(isAprimoHttpError(new AprimoError("x", "Y"))).toBe(false);
  });

  it.each([
    [isAprimoNetworkError, new AprimoNetworkError("x"), new AprimoTimeoutError("x")],
    [isAprimoTimeoutError, new AprimoTimeoutError("x"), new AprimoNetworkError("x")],
    [isAprimoCancelledError, new AprimoCancelledError("x"), new AprimoNetworkError("x")],
    [isAprimoAuthError, new AprimoAuthError("x"), new AprimoNetworkError("x")],
    [isAprimoUploadError, new AprimoUploadSetupError("x"), new AprimoNetworkError("x")],
    [isAprimoConfigError, new AprimoConfigError("x"), new AprimoNetworkError("x")],
  ])("%s narrows the right thing and rejects the wrong thing", (guard, hit, miss) => {
    expect((guard as (e: unknown) => boolean)(hit)).toBe(true);
    expect((guard as (e: unknown) => boolean)(miss)).toBe(false);
  });
});

describe("legacy error.type backward compatibility", () => {
  it("a switch on error.type still works for known categories", () => {
    const errors: AprimoError[] = [
      new AprimoCancelledError("x"),
      new AprimoUploadSetupError("x"),
      new AprimoUploadSegmentError("x", { segmentIndex: 0 }),
      new AprimoUploadCommitError("x"),
      new AprimoNotFoundError("x", { status: 404 }),
    ];

    const seen = errors.map((e) => {
      switch (e.type) {
        case "AbortError":
          return "abort";
        case "UploadSetupFailed":
          return "upload-setup";
        case "UploadSegmentFailed":
          return "upload-seg";
        case "UploadCommitFailed":
          return "upload-commit";
        case "NotFound":
          return "not-found";
        default:
          return "other";
      }
    });

    expect(seen).toEqual([
      "abort",
      "upload-setup",
      "upload-seg",
      "upload-commit",
      "not-found",
    ]);
  });

  it("err.message is populated and inherited from Error", () => {
    const err = new AprimoNotFoundError("Record 123 not found", { status: 404 });
    expect(err.message).toBe("Record 123 not found");
    expect(`${err}`).toContain("AprimoNotFoundError");
    expect(`${err}`).toContain("Record 123 not found");
  });
});
