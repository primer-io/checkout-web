import { words } from './words';

export function toKebabCase(text: string) {
  return words(text).join('-').toLowerCase();
}
