import { BASE_URL } from "./api.ts";

export async function getMe(token: string): Promise<{ role?: { name: string }; [key: string]: unknown }> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
