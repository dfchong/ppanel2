import { describe, expect, it, vi } from "vitest";
import { retry } from "./retry";

describe("retry", () => {
  it("returns after a transient failure", async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("temporary"))
      .mockResolvedValue("ok");

    await expect(retry(operation, { attempts: 3, delayMs: 0 })).resolves.toBe(
      "ok"
    );
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it("throws the final error after all attempts fail", async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValue(new Error("offline"));

    await expect(retry(operation, { attempts: 3, delayMs: 0 })).rejects.toThrow(
      "offline"
    );
    expect(operation).toHaveBeenCalledTimes(3);
  });
});
