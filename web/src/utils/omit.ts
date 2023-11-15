/**
 * Creates a new object without the specified `keys`.
 * @param object Object to inspect.
 * @param keys Keys to omit.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omit<T extends Record<string, any>>(
  object: T,
  ...keys: (keyof T)[]
) {
  const keySet = new Set(keys);
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keySet.has(key)),
  );
}
