import { buildQuery } from "./utils";

export function getApiBaseUrl() {
	const base = import.meta.env.VITE_API_BASE_URL;
	return `${base}/api`;
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
