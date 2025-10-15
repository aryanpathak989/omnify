const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:4000"

type RequestOptions = {
  method?: "GET" | "POST"
  headers?: Record<string, string>
  body?: any
  query?: Record<string, string | number | undefined>
}

function withQuery(path: string, query?: RequestOptions["query"]) {
  if (!query) return path
  const qs = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&")
  return qs ? `${path}?${qs}` : path
}

export async function api<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const isLocal = path.startsWith("/api/")
  const url = isLocal ? withQuery(path, opts.query) : `${BASE_URL}${withQuery(path, opts.query)}`
  const res = await fetch(url, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  })
  const text = await res.text()
  let data: any
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Request failed: ${res.status}`
    throw new Error(message)
  }
  return data as T
}

export const apiGet = <T,>(path: string, query?: RequestOptions["query"]) => api<T>(path, { method: "GET", query })
export const apiPost = <T,>(path: string, body?: any) => api<T>(path, { method: "POST", body })
