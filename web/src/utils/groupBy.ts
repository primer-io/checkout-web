/**
 * Groups elements in an array according to the specified `keyFn`.
 * @param array Elements to group.
 * @param keyFn Function that derives a key from an element.
 * @returns Object with derived keys as attribute names and arrays as values.
 * @example
 * groupBy([1, 2, 3], (n) => `${n > 2}`);
 * // { false: [1, 2], true: [3] }
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T, index: number, array: T[]) => string,
) {
  return array.reduce(
    (obj, item, index) => {
      const key = keyFn(item, index, array);
      (obj[key] ??= []).push(item);
      return obj;
    },
    {} as Record<string, T[]>,
  );
}
