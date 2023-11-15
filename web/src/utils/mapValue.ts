/**
 * Maps the values of an object according to the specified `mapFn`.
 * @param object Object to map values.
 * @param mapFn Function that transforms the value of an element.
 * @returns New object with mapped values.
 * @example
 * mapValue({ foo: 1, bar: 2 }, (v) => v + 1);
 * // { foo: 2, bar: 3 }
 */
export function mapValue<K extends PropertyKey, V, N>(
  object: { [key in K]: V },
  mapFn: (value: V, key: K, index: number) => N,
) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value], index) => [
      key,
      mapFn(value as V, key as K, index),
    ]),
  ) as { [key in K]: N };
}
