import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function buildQuery(params: Record<string, unknown>): string {
	const qp = new URLSearchParams();
	Object.entries(params).forEach(([k, v]) => {
		if (v === undefined || v === null || v === "") return;
		qp.append(k, String(v));
	});
	const s = qp.toString();
	return s ? `?${s}` : "";
}

export function formatDate(dateStr?: string | null): string {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return "";
	return d.toLocaleDateString();
}
