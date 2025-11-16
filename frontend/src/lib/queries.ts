import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiGet } from "./api";

import type { BaseGeral, BaseGeralQuery } from "../@types/baseGeral";
import type {
	ConvocacaoExamesGeral,
	ConvocacaoExamesGeralQuery,
} from "../@types/convocacaoExamesGeral";
import type { PaginatedResponse } from "../@types/response";

export function useBaseGeralList(params: BaseGeralQuery) {
	return useQuery<PaginatedResponse<BaseGeral>>({
		queryKey: ["base-geral", params],
		queryFn: () =>
			apiGet<PaginatedResponse<BaseGeral>>("/base-geral", params),
	});
}

export function useConvocacaoExamesGeralList(
	params: ConvocacaoExamesGeralQuery
) {
	return useQuery<PaginatedResponse<ConvocacaoExamesGeral>>({
		queryKey: ["convocacao-exames-geral", params],
		queryFn: () =>
			apiGet<PaginatedResponse<ConvocacaoExamesGeral>>(
				"/convocacao-exames-geral",
				params
			),
	});
}

export function usePrefetchBaseGeral(
	params: BaseGeralQuery,
	nextPage: number | undefined | null
) {
	const queryClient = useQueryClient();

	useEffect(() => {
		const prefetchNextPage = async () => {
			if (nextPage) {
				const nextParams = { ...params, page: nextPage };
				await queryClient.prefetchQuery({
					queryKey: ["base-geral", nextParams],
					queryFn: () =>
						apiGet<PaginatedResponse<BaseGeral>>(
							"/base-geral",
							nextParams
						),
				});
			}
		};

		prefetchNextPage();
	}, [nextPage, params, queryClient]);
}

export function usePrefetchConvocacaoExamesGeral(
	params: ConvocacaoExamesGeralQuery,
	nextPage: number | undefined | null
) {
	const queryClient = useQueryClient();

	useEffect(() => {
		const prefetchNextPage = async () => {
			if (nextPage) {
				const nextParams = { ...params, page: nextPage };
				await queryClient.prefetchQuery({
					queryKey: ["convocacao-exames-geral", nextParams],
					queryFn: () =>
						apiGet<PaginatedResponse<ConvocacaoExamesGeral>>(
							"/convocacao-exames-geral",
							nextParams
						),
				});
			}
		};

		prefetchNextPage();
	}, [nextPage, params, queryClient]);
}
