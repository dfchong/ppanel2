import { describe, expect, it } from "vitest";
import {
  buildUserSubscribeUrls,
  getSubscriptionUrlAvailability,
  hasSubscriptionVariables,
  isExpiredSubscription,
} from "./subscription";

describe("buildUserSubscribeUrls", () => {
  it("returns no URL while subscription configuration is unavailable", () => {
    expect(
      buildUserSubscribeUrls({
        origin: "https://panel.example.com",
        short: "abc",
        subscribe: {
          pan_domain: false,
          subscribe_domain: "",
          subscribe_path: "",
        },
        token: "token",
      })
    ).toEqual([]);
  });

  it("uses the current domain when only a subscription path is configured", () => {
    expect(
      buildUserSubscribeUrls({
        origin: "https://panel.example.com",
        short: "abc",
        subscribe: {
          pan_domain: false,
          subscribe_domain: "",
          subscribe_path: "/subscribe/",
        },
        token: "token",
      })
    ).toEqual(["https://panel.example.com/subscribe/?token=token"]);
  });

  it("builds URLs from configured domains", () => {
    expect(
      buildUserSubscribeUrls({
        origin: "https://panel.example.com",
        short: "abc",
        subscribe: {
          pan_domain: false,
          subscribe_domain: "sub1.example.com\nsub2.example.com",
          subscribe_path: "/subscribe/",
        },
        token: "token",
        type: "clash",
      })
    ).toEqual([
      "https://sub1.example.com/subscribe/?token=token&type=clash",
      "https://sub2.example.com/subscribe/?token=token&type=clash",
    ]);
  });
});

describe("getSubscriptionUrlAvailability", () => {
  it("reports loading before configuration is ready", () => {
    expect(
      getSubscriptionUrlAvailability({
        error: false,
        isLoading: true,
        urls: [],
      })
    ).toBe("loading");
  });

  it("reports unavailable when configuration failed", () => {
    expect(
      getSubscriptionUrlAvailability({
        error: true,
        isLoading: false,
        urls: [],
      })
    ).toBe("unavailable");
  });

  it("reports unavailable when configuration generated no URLs", () => {
    expect(
      getSubscriptionUrlAvailability({
        error: false,
        isLoading: false,
        urls: [],
      })
    ).toBe("unavailable");
  });

  it("reports ready when URLs are available", () => {
    expect(
      getSubscriptionUrlAvailability({
        error: false,
        isLoading: false,
        urls: ["https://sub.example.com/subscribe?token=x"],
      })
    ).toBe("ready");
  });
});

describe("hasSubscriptionVariables", () => {
  it("detects documents that require a subscription URL", () => {
    expect(hasSubscriptionVariables("Import {{subscribe_url_encoded}}")).toBe(
      true
    );
  });

  it("ignores documents without subscription URL variables", () => {
    expect(hasSubscriptionVariables("Welcome to {{site_name}}")).toBe(false);
  });
});

describe("isExpiredSubscription", () => {
  it("identifies a finite expired subscription", () => {
    expect(isExpiredSubscription({ expire_time: 1, status: 3 })).toBe(true);
  });

  it("does not treat a permanent subscription as expired", () => {
    expect(isExpiredSubscription({ expire_time: 0, status: 3 })).toBe(false);
  });

  it("does not treat an active subscription as expired", () => {
    expect(isExpiredSubscription({ expire_time: 1, status: 1 })).toBe(false);
  });
});
