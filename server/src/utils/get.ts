export async function get<T>(url: string, headers?: HeadersInit) {
  const response = await fetch(url, { headers });

  return response.json() as T;
}
