import { describe, expect, it } from "vitest";
import { differenceInDays } from "./formatting.js";

describe("differenceInDays", () => {
  const day = 24 * 60 * 60 * 1000;

  it("returns a truncated positive integer", () => {
    expect(differenceInDays(2.75 * day, 0)).toBe(2);
  });

  it("returns a truncated negative integer", () => {
    expect(differenceInDays(0, 2.75 * day)).toBe(-2);
  });

  it("keeps zero as a number", () => {
    expect(differenceInDays(day / 2, 0)).toBe(0);
  });
});
