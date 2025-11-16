import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import type { BaseGeralQuery } from "../../@types/baseGeral";

export type FilterBaseGeralProps = {
	value: BaseGeralQuery;
	onChange: (next: BaseGeralQuery) => void;
};

export function FilterBaseGeral({ value, onChange }: FilterBaseGeralProps) {
	const [local, setLocal] = useState<BaseGeralQuery>({
		page: 1,
		size: 10,
		sort_by: "id",
		sort_order: "asc",
		...value,
	});
	const [isExpanded, setIsExpanded] = useState(false);

	function setField<K extends keyof BaseGeralQuery>(
		key: K,
		val: BaseGeralQuery[K]
	) {
		setLocal(p => ({ ...p, [key]: val }));
	}

	function submit(e?: React.FormEvent) {
		e?.preventDefault();
		onChange({ ...local, page: 1 });
	}
	function clear() {
		const base = {
			page: 1,
			size: local.size ?? 10,
			sort_by: local.sort_by ?? "id",
			sort_order: local.sort_order ?? "asc",
		} as BaseGeralQuery;
		onChange(base);
	}

	return (
		<Card>
			<CardHeader
				className="cursor-pointer"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">Filtros de Busca</CardTitle>
					<Button type="button" variant="ghost" size="sm">
						{isExpanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				</div>
			</CardHeader>
			{isExpanded && (
				<CardContent>
					<form onSubmit={submit} className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Ticket
								</label>
								<Input
									type="number"
									value={local.ticket ?? ""}
									placeholder="Número do ticket"
									onChange={e =>
										setField(
											"ticket",
											e.target.value === ""
												? ""
												: Number(e.target.value)
										)
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Etapa Atual
								</label>
								<Input
									value={local.etapa_atual ?? ""}
									onChange={e =>
										setField("etapa_atual", e.target.value)
									}
									placeholder="Etapa atual"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Solicitante
								</label>
								<Input
									value={local.solicitante__contains ?? ""}
									onChange={e =>
										setField(
											"solicitante__contains",
											e.target.value
										)
									}
									placeholder="Nome do solicitante"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Status
								</label>
								<Input
									value={local.status ?? ""}
									onChange={e =>
										setField("status", e.target.value)
									}
									placeholder="Status"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Nome do Colaborador
								</label>
								<Input
									value={
										local.nome_colaborador__contains ?? ""
									}
									onChange={e =>
										setField(
											"nome_colaborador__contains",
											e.target.value
										)
									}
									placeholder="Nome completo"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Tipo de Exame
								</label>
								<Input
									value={local.tipo_exame ?? ""}
									onChange={e =>
										setField("tipo_exame", e.target.value)
									}
									placeholder="Tipo de exame"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Solicitação (De)
								</label>
								<Input
									type="date"
									value={local.data_solicitacao__gte ?? ""}
									onChange={e =>
										setField(
											"data_solicitacao__gte",
											e.target.value
										)
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Solicitação (Até)
								</label>
								<Input
									type="date"
									value={local.data_solicitacao__lte ?? ""}
									onChange={e =>
										setField(
											"data_solicitacao__lte",
											e.target.value
										)
									}
								/>
							</div>
						</div>

						<div className="border-t pt-4">
							<p className="text-sm font-medium mb-3 text-muted-foreground">
								Ordenação
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Ordenar Por
									</label>
									<Select
										value={local.sort_by ?? "id"}
										onChange={e =>
											setField(
												"sort_by",
												e.target
													.value as BaseGeralQuery["sort_by"]
											)
										}
									>
										<option value="id">ID</option>
										<option value="ticket">Ticket</option>
										<option value="data_solicitacao">
											Data Solicitação
										</option>
									</Select>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										Ordem
									</label>
									<Select
										value={local.sort_order ?? "asc"}
										onChange={e =>
											setField(
												"sort_order",
												e.target
													.value as BaseGeralQuery["sort_order"]
											)
										}
									>
										<option value="asc">Crescente</option>
										<option value="desc">
											Decrescente
										</option>
									</Select>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
							<Button type="submit" className="flex-1">
								Aplicar Filtros
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={clear}
								className="flex-1 sm:flex-initial"
							>
								Limpar Filtros
							</Button>
						</div>
					</form>
				</CardContent>
			)}
		</Card>
	);
}
