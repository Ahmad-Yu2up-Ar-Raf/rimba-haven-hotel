import ky from "ky";

export const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1",
  timeout: 10000,
  retry: 0,
  headers: { Accept: "application/json" },
});
