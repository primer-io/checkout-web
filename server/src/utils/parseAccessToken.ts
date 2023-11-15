export function parseAccessToken(clientToken: string) {
  const [header, payload] = clientToken.split('.');
  const encoded = payload || header;
  const { accessToken } = JSON.parse(atob(encoded)) as { accessToken: string };
  return accessToken;
}
