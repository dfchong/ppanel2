import { create } from "zustand";

// Fixed remote stats endpoint and required header
export const REQUIRED_HEADER_NAME = "stats";
export const REQUIRED_HEADER_VALUE = "ppanel.dev";
const STATS_URL = "https://stats.ppanel.dev";
const STATS_LOADED_KEY = "ppanel:stats:loaded";

interface StatsState {
  loading: boolean;
  loaded: boolean;
  stats: () => Promise<void>;
}

async function hashHostname(hostname: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(hostname);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (_e) {
    return "";
  }
}

export const useStatsStore = create<StatsState>((set) => ({
  loading: false,
  loaded:
    typeof window !== "undefined"
      ? Boolean(window.localStorage.getItem(STATS_LOADED_KEY))
      : false,

  stats: async () => {
    // if already recorded, skip
    if (typeof window !== "undefined") {
      try {
        if (window.localStorage.getItem(STATS_LOADED_KEY)) return;
      } catch {
        /* empty */
      }
    }

    set({ loading: true });
    try {
      const hostname =
        typeof window !== "undefined" && window.location
          ? window.location.hostname
          : "";
      const domain = hostname ? await hashHostname(hostname) : "";

      await fetch(STATS_URL, {
        method: "POST",
        headers: {
          [REQUIRED_HEADER_NAME]: REQUIRED_HEADER_VALUE,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain,
        }),
      });
      set({ loaded: true });
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STATS_LOADED_KEY, "1");
        } catch {
          /* empty */
        }
      }
    } catch (_error) {
      // treat as completed to avoid repeated attempts
      set({ loaded: false });
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STATS_LOADED_KEY, "0");
        } catch {
          /* empty */
        }
      }
    } finally {
      set({ loading: false });
    }
  },
}));
