import { type RetryOptions, retry } from "./retry";

interface DataEnvelope<T> {
  data?: {
    data?: T | null;
  };
}

export function loadRequiredData<T>(
  request: () => Promise<DataEnvelope<T>>,
  options: RetryOptions
): Promise<T> {
  return retry(async () => {
    const response = await request();
    const data = response.data?.data;
    if (!data) {
      throw new Error("Configuration response is empty");
    }
    return data;
  }, options);
}
