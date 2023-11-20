export function uid(size = 8) {
  return [...crypto.getRandomValues(new Uint8Array(size))]
    .map((n) => n.toString(36))
    .join('')
    .slice(0, size);
}
