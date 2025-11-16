import { useState } from "react";
import type { ConvocacaoExamesGeralQuery } from "../../@types/convocacaoExamesGeral";
import {
	useConvocacaoExamesGeralList as useConvocacaoExamesGeralListQuery,
	usePrefetchConvocacaoExamesGeral,
} from "../../lib/queries";

export function useConvocacaoExamesGeralList() {
	const [params, setParams] = useState<ConvocacaoExamesGeralQuery>({
		page: 1,
		size: 10,
		sort_by: "matricula",
		sort_order: "asc",
	});

	const { data, isLoading, error } =
		useConvocacaoExamesGeralListQuery(params);
	usePrefetchConvocacaoExamesGeral(params, data?.meta?.next_page);

	return {
		params,
		setParams,
		data,
		isLoading,
		error,
	};
}

export function getSituacaoVariant(
	situacao: string | null
): "default" | "success" | "warning" | "error" {
	if (!situacao) return "default";
	const s = situacao.toLowerCase();
	if (s.includes("ativo")) return "success";
	if (s.includes("afastado") || s.includes("férias")) return "warning";
	if (s.includes("inativo") || s.includes("demitido")) return "error";
	return "default";
}
