import { useState } from "react";

export function useToken(): [string | null, (token: string | null) => void] {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });
  return [token, setToken];
}
