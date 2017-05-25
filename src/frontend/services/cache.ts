
const cache = new Map<string, any>();

export function cached<A>(
  key: string,
  promiseFunc: () => Promise<A>,
): Promise<A> {
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key));
  }
  return promiseFunc()
    .then((result) => {
      cache.set(key, result);
      return result;
    });
}
