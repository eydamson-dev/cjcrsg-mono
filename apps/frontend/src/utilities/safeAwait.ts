export async function safeAwait<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      return [error, null];
    } else {
      return [new Error(String(error)), null];
    }
  }
}
