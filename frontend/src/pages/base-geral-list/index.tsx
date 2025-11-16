import { useState } from "react";
import type { BaseGeral } from "../../@types/baseGeral.ts";
import { type Column, DataTable } from "../../components/DataTable.tsx";
import { FilterBaseGeral } from "../../components/filters/FilterBaseGeral.tsx";
import { Badge } from "../../components/ui/badge.tsx";
import { Button } from "../../components/ui/button.tsx";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog.tsx";
import { formatDate } from "../../lib/utils.ts";
import { getStatusVariant, useBaseGeralList } from "./useBaseGeralList.ts";

function getColumns(): Column<BaseGeral>[] {
	return [
		{
			key: "id",
			header: "ID",
			render: r => <span className="font-mono text-xs">{r.id}</span>,
		},
		{
			key: "ticket",
			header: "Ticket",
			render: r =>
				r.ticket ? (
					<span className="font-medium">#{r.ticket}</span>
				) : (
					"—"
				),
		},
		{
			key: "solicitante",
			header: "Solicitante",
			render: r => r.solicitante || "—",
		},
		{
			key: "nome_colaborador",
			header: "Colaborador",
			render: r => r.nome_colaborador || "—",
		},
		{
			key: "tipo_exame",
			header: "Tipo Exame",
			render: r => r.tipo_exame || "—",
		},
		{
			key: "status",
			header: "Status",
			render: r =>
				r.status ? (
					<Badge variant={getStatusVariant(r.status)}>
						{r.status}
					</Badge>
				) : (
					"—"
				),
		},
		{
			key: "data_solicitacao",
			header: "Solicitação",
			render: r => formatDate(r.data_solicitacao) || "—",
		},
		{
			key: "data_exame",
			header: "Data Exame",
			render: r => formatDate(r.data_exame) || "—",
		},
	];
}

export default function BaseGeralListPage() {
	const { params, setParams, data, isLoading, error } = useBaseGeralList();
	const [selectedRecord, setSelectedRecord] = useState<BaseGeral | null>(
		null
	);
	const columns = getColumns();

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Base Geral
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Gerencie e visualize registros da base geral de solicitações
				</p>
			</div>

			<FilterBaseGeral value={params} onChange={setParams} />

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

			<Dialog
				open={!!selectedRecord}
				onOpenChange={open => !open && setSelectedRecord(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Detalhes do Registro</DialogTitle>
					</DialogHeader>
					<DialogBody>
						{selectedRecord && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<DetailField
									label="ID"
									value={selectedRecord.id}
									monospace
								/>
								<DetailField
									label="Ticket"
									value={
										selectedRecord.ticket
											? `#${selectedRecord.ticket}`
											: null
									}
								/>
								<DetailField
									label="Solicitante"
									value={selectedRecord.solicitante}
								/>
								<DetailField
									label="Data Solicitação"
									value={formatDate(
										selectedRecord.data_solicitacao
									)}
								/>
								<DetailField
									label="Etapa Atual"
									value={selectedRecord.etapa_atual}
								/>
								<div>
									<p className="text-xs font-medium text-muted-foreground">
										Status
									</p>
									<p className="text-sm mt-1">
										{selectedRecord.status ? (
											<Badge
												variant={getStatusVariant(
													selectedRecord.status
												)}
											>
												{selectedRecord.status}
											</Badge>
										) : (
											"—"
										)}
									</p>
								</div>
								<DetailField
									label="Colaborador"
									value={selectedRecord.nome_colaborador}
								/>
								<DetailField
									label="Tipo Exame"
									value={selectedRecord.tipo_exame}
								/>
								<DetailField
									label="Data Exame"
									value={formatDate(
										selectedRecord.data_exame
									)}
								/>
								<DetailField
									label="Cidade Preferência"
									value={selectedRecord.cidade_preferencia}
								/>
								<DetailField
									label="Agendar Enquadramento PCD"
									value={
										selectedRecord.agendar_enquadramento_pcd
									}
								/>
								<DetailField
									label="Possui Formulário RAC"
									value={selectedRecord.possui_formulario_rac}
								/>
								<DetailField
									label="Possui Exames Complementares"
									value={
										selectedRecord.possui_exames_complementares
									}
								/>
								<DetailField
									label="Data Conclusão Dia"
									value={formatDate(
										selectedRecord.data_conclusao_dia
									)}
								/>
								<DetailField
									label="Status SLA Agendamento"
									value={
										selectedRecord.status_sla_agendamento
									}
								/>
								<DetailField
									label="Data Última Alteração"
									value={formatDate(
										selectedRecord.data_ultima_alteracao
									)}
								/>
								<DetailField
									label="Tipo Solicitação Agendamento"
									value={
										selectedRecord.dados_agendamento_tipo_solicitacao
									}
									className="md:col-span-2"
								/>
							</div>
						)}
					</DialogBody>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setSelectedRecord(null)}
						>
							Fechar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function DetailField({
	label,
	value,
	monospace,
	className,
}: {
	label: string;
	value: string | number | null | undefined;
	monospace?: boolean;
	className?: string;
}) {
	return (
		<div className={className}>
			<p className="text-xs font-medium text-muted-foreground">{label}</p>
			<p className={`text-sm mt-1 ${monospace ? "font-mono" : ""}`}>
				{value ?? "—"}
			</p>
		</div>
	);
}
