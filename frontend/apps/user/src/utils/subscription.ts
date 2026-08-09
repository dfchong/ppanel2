export interface SubscriptionUrlOptions {
  origin: string;
  short: string;
  subscribe: {
    pan_domain?: boolean;
    subscribe_domain?: string;
    subscribe_path?: string;
  };
  token: string;
  type?: string;
}

/** Extract the full domain or root domain from a URL. */
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

export type SubscriptionUrlAvailability = "loading" | "unavailable" | "ready";

export function getSubscriptionUrlAvailability({
  error,
  isLoading,
  urls,
}: {
  error: boolean;
  isLoading: boolean;
  urls: string[];
}): SubscriptionUrlAvailability {
  if (isLoading) {
    return "loading";
  }
  return error || urls.length === 0 ? "unavailable" : "ready";
}

export function isExpiredSubscription({
  expire_time,
  status,
}: {
  expire_time: number;
  status: number;
}): boolean {
  return status === 3 && expire_time !== 0;
}

export function hasSubscriptionVariables(content: string): boolean {
  return /{{subscribe_url(?:_encoded|_base64|_qx)?}}/.test(content);
}

export function buildUserSubscribeUrls({
  origin,
  short,
  subscribe,
  token,
  type,
}: SubscriptionUrlOptions): string[] {
  const { pan_domain, subscribe_domain, subscribe_path } = subscribe;

  if (!(subscribe_domain || subscribe_path)) {
    return [];
  }

  const configuredDomains = subscribe_domain
    ?.split("\n")
    .map((domain) => domain.trim())
    .filter(Boolean);
  const fallbackDomain = extractDomain(origin, pan_domain);
  const domains = configuredDomains?.length
    ? configuredDomains
    : fallbackDomain
      ? [fallbackDomain]
      : [];

  return domains.map((domain) => {
    if (pan_domain) {
      if (type) {
        return `https://${short}.${type}.${domain}${subscribe_path}?token=${token}&type=${type}`;
      }
      return `https://${short}.${domain}${subscribe_path}?token=${token}`;
    }
    if (type) {
      return `https://${domain}${subscribe_path}?token=${token}&type=${type}`;
    }
    return `https://${domain}${subscribe_path}?token=${token}`;
  });
}
