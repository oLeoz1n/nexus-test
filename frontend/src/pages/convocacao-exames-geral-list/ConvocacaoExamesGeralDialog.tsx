import type { ConvocacaoExamesGeral } from "../../@types/convocacaoExamesGeral.ts";
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
import { getSituacaoVariant } from "./useConvocacaoExamesGeralList.ts";

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

export function ConvocacaoExamesGeralDialog({
	selectedRecord,
	onClose,
}: {
	selectedRecord: ConvocacaoExamesGeral | null;
	onClose: () => void;
}) {
	return (
		<Dialog
			open={!!selectedRecord}
			onOpenChange={open => !open && onClose()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Detalhes do Colaborador</DialogTitle>
				</DialogHeader>
				<DialogBody>
					{selectedRecord && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<DetailField
								label="Matrícula"
								value={selectedRecord.matricula}
								monospace
							/>
							<DetailField
								label="Nome"
								value={selectedRecord.nome}
							/>
							<DetailField
								label="Cargo"
								value={selectedRecord.cargo}
							/>
							<DetailField
								label="Exame"
								value={selectedRecord.exame}
							/>
							<DetailField
								label="Último Pedido"
								value={formatDate(selectedRecord.ultimo_pedido)}
							/>
							<DetailField
								label="Data Resultado"
								value={formatDate(
									selectedRecord.data_resultado
								)}
							/>
							<DetailField
								label="Periodicidade"
								value={
									selectedRecord.periodicidade
										? `${selectedRecord.periodicidade} dias`
										: null
								}
							/>
							<DetailField
								label="Refazer Em"
								value={formatDate(selectedRecord.refazer_em)}
							/>
							<DetailField
								label="Data Admissão"
								value={formatDate(selectedRecord.dt_admissao)}
							/>
							<DetailField
								label="Data Nascimento"
								value={formatDate(selectedRecord.dt_nascimento)}
							/>
							<div>
								<p className="text-xs font-medium text-muted-foreground">
									Situação
								</p>
								<p className="text-sm mt-1">
									{selectedRecord.situacao ? (
										<Badge
											variant={getSituacaoVariant(
												selectedRecord.situacao
											)}
										>
											{selectedRecord.situacao}
										</Badge>
									) : (
										"—"
									)}
								</p>
							</div>
							<DetailField
								label="Cidade Unidade"
								value={selectedRecord.cidade_unidade}
							/>
							<DetailField
								label="Estado Unidade"
								value={selectedRecord.estado_unidade}
							/>
							<DetailField
								label="Data Referência"
								value={selectedRecord.data_referencia}
							/>
						</div>
					)}
				</DialogBody>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Fechar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
