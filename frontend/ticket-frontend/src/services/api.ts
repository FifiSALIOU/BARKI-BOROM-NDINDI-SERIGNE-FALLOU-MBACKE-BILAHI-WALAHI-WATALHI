const BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000";

export { BASE_URL };

export function fetchWithAuth(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<Response> {
  const { token, ...rest } = options;
  const url = path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(rest.headers as HeadersInit);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, { ...rest, headers });
}
