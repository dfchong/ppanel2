export const isBrowser = () => typeof window !== "undefined";

/**
 * Extracts the full domain or root domain from a URL.
 *
 * @param url - The URL to extract the domain from.
 * @param extractRoot - If true, extracts the root domain (e.g., example.com). If false, extracts the full domain (e.g., sub.example.com).
 * @returns The extracted domain or root domain, or null if the URL is invalid.
 */
export function extractDomain(url: string, extractRoot = true): string | null {
  try {
    const { hostname } = new URL(url);
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      return hostname;
    }
    const domainParts = hostname.split(".").filter(Boolean);
    if (extractRoot && domainParts.length > 2) {
      return domainParts.slice(-2).join(".");
    }
    return hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}
