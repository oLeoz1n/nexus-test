import { buildQuery } from "./utils";

const DEFAULT_BASE = "http://localhost:8000";

export function getApiBaseUrl() {
	const env = (import.meta as any).env;
	const base = env?.VITE_API_BASE_URL || DEFAULT_BASE;
	return `${String(base).replace(/\/$/, "")}/api`;
}

export async function apiGet<T>(
	path: string,
	params?: Record<string, unknown>
): Promise<T> {
	const url = `${getApiBaseUrl()}${path}${buildQuery(params ?? {})}`;
	const res = await fetch(url, { headers: { Accept: "application/json" } });
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`GET ${url} failed: ${res.status} ${text}`);
	}
	return res.json() as Promise<T>;
}
