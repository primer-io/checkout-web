import { describe, expect, it } from 'vitest';
import { parseAccessToken } from './parseAccessToken';

describe('parseAccessToken', () => {
  it('should return the accessToken inside the clientToken', () => {
    const accessToken = 'accessToken';
    const clientToken = `header.${btoa(JSON.stringify({ accessToken }))}`;

    const result = parseAccessToken(clientToken);

    expect(result).toBe(accessToken);
  });

  it('should be able to read the token even without a header', () => {
    const accessToken = 'accessToken';
    const clientToken = btoa(JSON.stringify({ accessToken }));

    const result = parseAccessToken(clientToken);

    expect(result).toBe(accessToken);
  });
});
