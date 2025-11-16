import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import type { ConvocacaoExamesGeralQuery } from "../../@types/convocacaoExamesGeral";

export type FilterConvocacaoExamesGeralProps = {
	value: ConvocacaoExamesGeralQuery;
	onChange: (next: ConvocacaoExamesGeralQuery) => void;
};

export function FilterConvocacaoExamesGeral({
	value,
	onChange,
}: FilterConvocacaoExamesGeralProps) {
	const [local, setLocal] = useState<ConvocacaoExamesGeralQuery>({
		page: 1,
		size: 10,
		sort_by: "matricula",
		sort_order: "asc",
		...value,
	});
	const [isExpanded, setIsExpanded] = useState(true);

	function setField<K extends keyof ConvocacaoExamesGeralQuery>(
		key: K,
		val: ConvocacaoExamesGeralQuery[K]
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
			sort_by: local.sort_by ?? "matricula",
			sort_order: local.sort_order ?? "asc",
		} as ConvocacaoExamesGeralQuery;
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
									Cargo
								</label>
								<Input
									value={local.cargo ?? ""}
									onChange={e =>
										setField("cargo", e.target.value)
									}
									placeholder="Cargo"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Nome
								</label>
								<Input
									value={local.nome ?? ""}
									onChange={e =>
										setField("nome", e.target.value)
									}
									placeholder="Nome completo"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Matrícula
								</label>
								<Input
									value={local.matricula ?? ""}
									onChange={e =>
										setField("matricula", e.target.value)
									}
									placeholder="Número da matrícula"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Admissão (De)
								</label>
								<Input
									type="date"
									value={local.dt_admissao__gte ?? ""}
									onChange={e =>
										setField(
											"dt_admissao__gte",
											e.target.value
										)
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Admissão (Até)
								</label>
								<Input
									type="date"
									value={local.dt_admissao__lte ?? ""}
									onChange={e =>
										setField(
											"dt_admissao__lte",
											e.target.value
										)
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Situação
								</label>
								<Input
									value={local.situacao ?? ""}
									onChange={e =>
										setField("situacao", e.target.value)
									}
									placeholder="Situação"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Nascimento (De)
								</label>
								<Input
									type="date"
									value={local.dt_nascimento_gte ?? ""}
									onChange={e =>
										setField(
											"dt_nascimento_gte",
											e.target.value
										)
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Data Nascimento (Até)
								</label>
								<Input
									type="date"
									value={local.dt_nascimento_lte ?? ""}
									onChange={e =>
										setField(
											"dt_nascimento_lte",
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
										value={local.sort_by ?? "matricula"}
										onChange={e =>
											setField(
												"sort_by",
												e.target
													.value as ConvocacaoExamesGeralQuery["sort_by"]
											)
										}
									>
										<option value="matricula">
											Matrícula
										</option>
										<option value="dt_admissao">
											Data de Admissão
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
													.value as ConvocacaoExamesGeralQuery["sort_order"]
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
