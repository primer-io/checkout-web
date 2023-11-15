import { describe, expect, it } from 'vitest';
import { words } from './words';

describe('words', () => {
  it('should find all words in a string and return an array', () => {
    const cases = [
      'PascalCase',
      'camelCase',
      'snake_case',
      'UPPER_SNAKE_CASE',
      'kebab-case',
      'lowercase',
      'UPPERCASE',
      'Sentence case',
      'Capitalized Sentence Case',
      '!@#$%^&*()_-+=`~"\'{}[]\\|/.<>?;:',
    ];

    const result = words(cases.join(' '));

    expect(result.join(' ')).toBe(
      [
        'Pascal Case',
        'camel Case',
        'snake case',
        'UPPER SNAKE CASE',
        'kebab case',
        'lowercase',
        'UPPERCASE',
        'Sentence case',
        'Capitalized Sentence Case',
      ].join(' '),
    );
  });
});
