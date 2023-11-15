import { describe, expect, it } from 'vitest';
import { toKebabCase } from './toKebabCase';

describe('toKebabCase', () => {
  it('should transform text into kebab-case', () => {
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
    const result = cases.map(toKebabCase);

    expect(result).toStrictEqual([
      'pascal-case',
      'camel-case',
      'snake-case',
      'upper-snake-case',
      'kebab-case',
      'lowercase',
      'uppercase',
      'sentence-case',
      'capitalized-sentence-case',
      '',
    ]);
  });
});
