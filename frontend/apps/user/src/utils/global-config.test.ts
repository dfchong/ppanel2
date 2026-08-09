import { describe, expect, it, vi } from "vitest";
import { loadRequiredData } from "./global-config";

describe("loadRequiredData", () => {
  it("retries an empty response before returning config data", async () => {
    const request = vi
      .fn<() => Promise<{ data?: { data?: { siteName: string } } }>>()
      .mockResolvedValueOnce({ data: {} })
      .mockResolvedValue({ data: { data: { siteName: "PPanel" } } });

    await expect(
      loadRequiredData(request, { attempts: 3, delayMs: 0 })
    ).resolves.toEqual({ siteName: "PPanel" });
    expect(request).toHaveBeenCalledTimes(2);
  });

  it("throws after every response is empty", async () => {
    const request = vi
      .fn<() => Promise<{ data?: { data?: { siteName: string } } }>>()
      .mockResolvedValue({ data: {} });

    await expect(
      loadRequiredData(request, { attempts: 3, delayMs: 0 })
    ).rejects.toThrow("Configuration response is empty");
    expect(request).toHaveBeenCalledTimes(3);
  });
});
