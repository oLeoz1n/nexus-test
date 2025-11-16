import { useState } from "react";
import type { BaseGeralQuery } from "../../@types/baseGeral";
import {
	useBaseGeralList as useBaseGeralListQuery,
	usePrefetchBaseGeral,
} from "../../lib/queries";

export function useBaseGeralList() {
	const [params, setParams] = useState<BaseGeralQuery>({
		page: 1,
		size: 10,
		sort_by: "id",
		sort_order: "asc",
	});

	const { data, isLoading, error } = useBaseGeralListQuery(params);
	usePrefetchBaseGeral(params, data?.meta?.next_page);

	return {
		params,
		setParams,
		data,
		isLoading,
		error,
	};
}

export function getStatusVariant(
	status: string | null
): "default" | "success" | "warning" | "error" {
	if (!status) return "default";
	const s = status.toLowerCase();
	if (s.includes("concluído") || s.includes("finalizado")) return "success";
	if (s.includes("pendente") || s.includes("aguardando")) return "warning";
	if (s.includes("cancelado") || s.includes("erro")) return "error";
	return "default";
}
