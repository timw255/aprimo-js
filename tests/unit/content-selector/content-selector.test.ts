import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { contentSelector, ContentSelectorResult } from "../../../src/content-selector";

describe("contentSelector", () => {
  const mockOpen = vi.fn();
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    // mock window APIs
    (globalThis as any).window = {
      open: mockOpen,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      btoa: (str: string) => Buffer.from(str).toString("base64"),
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  it("throws if called outside the browser", () => {
    delete (globalThis as any).window;

    const selector = contentSelector("mytenant");

    expect(() =>
      selector.open({ title: "Select" }, vi.fn())
    ).toThrow("Aprimo Content Selector is only available in the browser.");
  });

  it("opens the selector with correct URL and sets up message listener", () => {
    const selector = contentSelector("mytenant");

    const options = {
      title: "Select something",
      select: "Single" as const,
    };

    selector.open(options, vi.fn());

    const expectedUrl = `https://mytenant.dam.aprimo.com/dam/selectcontent#options=${Buffer.from(
      JSON.stringify(options)
    ).toString("base64")}`;

    expect(mockOpen).toHaveBeenCalledWith(expectedUrl, "AprimoContentSelector");
    expect(mockAddEventListener).toHaveBeenCalledWith("message", expect.any(Function), false);
  });

  it("invokes callback on valid message and removes listener", () => {
    const selector = contentSelector("mytenant");

    const mockCallback = vi.fn();
    let capturedListener: any = null;

    mockAddEventListener.mockImplementation((_event, listener) => {
      capturedListener = listener;
    });

    selector.open({ title: "Select" }, mockCallback);

    const result: ContentSelectorResult = {
      result: "accept",
      selection: [{ id: "abc", title: "Test" }],
    };

    capturedListener({ origin: "https://mytenant.dam.aprimo.com", data: result });

    expect(mockCallback).toHaveBeenCalledWith(result);
    expect(mockRemoveEventListener).toHaveBeenCalledWith("message", capturedListener);
  });

  it("ignores messages from wrong origin or missing result", () => {
    const selector = contentSelector("mytenant");
    const mockCallback = vi.fn();
    let capturedListener: any = null;

    mockAddEventListener.mockImplementation((_event, listener) => {
      capturedListener = listener;
    });

    selector.open({ title: "Select" }, mockCallback);

    capturedListener({ origin: "https://other.dam.aprimo.com", data: { result: "accept" } });
    capturedListener({ origin: "https://mytenant.dam.aprimo.com", data: null });

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
