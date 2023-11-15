/**
 * Finds all the words in the specified `text`.
 * @param text String to find words in.
 * @example
 * words('HelloWorld!')
 * // ['hello', 'world']
 */
export function words(text: string) {
  return (
    text
      // replace "snake_case" and "kebab-case" separators with spaces
      .replaceAll(/[-_]/g, ' ')
      // remove all special characters except spaces
      .replaceAll(/[^\s\w]/g, '')
      // find "Capitalized" words and numbers "123"
      //   ! does not find cardinals like 1st or 2nd because they are language specific
      .replaceAll(/([A-Z][a-z]+|[0-9]+)/g, ' $1')
      // find acronyms like "JSON" or "HTTP"
      .replaceAll(/([A-Z]{2,})/g, ' $1')
      .trim()
      .split(/\s+/)
  );
}
