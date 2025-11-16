export type BaseGeral = {
	id: number;
	ticket: number | null;
	solicitante: string | null;
	data_solicitacao: string | null;
	etapa_atual: string | null;
	status: string | null;
	nome_colaborador: string | null;
	tipo_exame: string | null;
	data_exame: string | null;
	cidade_preferencia: string | null;
	agendar_enquadramento_pcd: string | null;
	possui_formulario_rac: string | null;
	possui_exames_complementares: string | null;
	data_conclusao_dia: string | null;
	status_sla_agendamento: string | null;
	data_ultima_alteracao: string | null;
	dados_agendamento_tipo_solicitacao: string | null;
};

export type BaseGeralQuery = {
	page?: number;
	size?: number;
	sort_by?: "id" | "ticket" | "data_solicitacao";
	sort_order?: "asc" | "desc";
	ticket?: number | "";
	etapa_atual?: string;
	data_solicitacao__gte?: string;
	data_solicitacao__lte?: string;
	solicitante?: string;
	status?: string;
	nome_colaborador?: string;
	tipo_exame?: string;
};
