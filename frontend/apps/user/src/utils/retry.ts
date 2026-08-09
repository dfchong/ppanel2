export interface RetryOptions {
  attempts: number;
  delayMs: number;
}

export async function retry<T>(
  operation: () => Promise<T>,
  { attempts, delayMs }: RetryOptions
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < attempts && delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
