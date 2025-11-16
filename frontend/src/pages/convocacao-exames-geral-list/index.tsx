import { useState } from "react";
import { type Column, DataTable } from "../../components/DataTable.tsx";
import { FilterConvocacaoExamesGeral } from "../../components/filters/FilterConvocacaoExamesGeral.tsx";
import { Badge } from "../../components/ui/badge.tsx";
import { formatDate } from "../../lib/utils.ts";
import { ConvocacaoExamesGeralDialog } from "./ConvocacaoExamesGeralDialog.tsx";
import {
	getSituacaoVariant,
	useConvocacaoExamesGeralList,
} from "./useConvocacaoExamesGeralList.ts";
import type { ConvocacaoExamesGeral } from "../../@types/convocacaoExamesGeral.ts";

function getColumns(): Column<ConvocacaoExamesGeral>[] {
	return [
		{
			key: "matricula",
			header: "Matrícula",
			render: r =>
				r.matricula ? (
					<span className="font-mono text-xs">{r.matricula}</span>
				) : (
					"—"
				),
		},
		{ key: "nome", header: "Nome", render: r => r.nome || "—" },
		{ key: "cargo", header: "Cargo", render: r => r.cargo || "—" },
		{ key: "exame", header: "Exame", render: r => r.exame || "—" },
		{
			key: "ultimo_pedido",
			header: "Último Pedido",
			render: r => formatDate(r.ultimo_pedido) || "—",
		},
		{
			key: "refazer_em",
			header: "Refazer em",
			render: r => formatDate(r.refazer_em) || "—",
		},
		{
			key: "dt_admissao",
			header: "Admissão",
			render: r => formatDate(r.dt_admissao) || "—",
		},
		{
			key: "data_referencia",
			header: "Data Referência",
			render: r => formatDate(r.data_referencia) || "—",
		},
		{
			key: "situacao",
			header: "Situação",
			render: r =>
				r.situacao ? (
					<Badge variant={getSituacaoVariant(r.situacao)}>
						{r.situacao}
					</Badge>
				) : (
					"—"
				),
		},
	];
}

export default function ConvocacaoExamesGeralListPage() {
	const { params, setParams, data, isLoading, error } =
		useConvocacaoExamesGeralList();
	const [selectedRecord, setSelectedRecord] =
		useState<ConvocacaoExamesGeral | null>(null);
	const columns = getColumns();

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Convocação de Exames - Geral
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Acompanhe convocações e situações de exames dos
					colaboradores
				</p>
			</div>

			<FilterConvocacaoExamesGeral
				value={params}
				onChange={next => setParams(p => ({ ...p, ...next, page: 1 }))}
			/>

			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-4">
					<div className="flex items-start gap-3">
						<svg
							className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div>
							<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
								Erro ao carregar dados
							</h3>
							<p className="text-sm text-red-700 dark:text-red-300 mt-1">
								Não foi possível carregar os registros.
								Verifique sua conexão e tente novamente.
							</p>
						</div>
					</div>
				</div>
			)}

			<DataTable
				columns={columns}
				data={data?.results ?? []}
				count={data?.count ?? 0}
				page={params.page ?? 1}
				pageSize={params.size ?? 10}
				meta={data?.meta}
				isLoading={isLoading}
				onPageChange={page => setParams(p => ({ ...p, page }))}
				onPageSizeChange={size =>
					setParams(p => ({ ...p, size, page: 1 }))
				}
				onRowClick={row => setSelectedRecord(row)}
			/>

			<ConvocacaoExamesGeralDialog
				selectedRecord={selectedRecord}
				onClose={() => setSelectedRecord(null)}
			/>
		</div>
	);
}
