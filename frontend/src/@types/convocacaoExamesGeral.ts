export type ConvocacaoExamesGeral = {
	cargo: string | null;
	nome: string | null;
	matricula: string | null;
	exame: string | null;
	ultimo_pedido: string | null;
	data_resultado: string | null;
	periodicidade: number | null;
	refazer_em: string | null;
	dt_admissao: string | null;
	situacao: string | null;
	cidade_unidade: string | null;
	estado_unidade: string | null;
	dt_nascimento: string | null;
	data_referencia: string | null;
};

export type ConvocacaoExamesGeralQuery = {
	page?: number;
	size?: number;
	sort_by?: "matricula" | "dt_admissao";
	sort_order?: "asc" | "desc";
	cargo?: string;
	nome?: string;
	matricula?: string;
	dt_admissao__gte?: string;
	dt_admissao__lte?: string;
	situacao?: string;
	dt_nascimento_gte?: string;
	dt_nascimento_lte?: string;
};
