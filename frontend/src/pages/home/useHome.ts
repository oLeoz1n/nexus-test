import { useNavigate } from "react-router-dom";

export function useHome() {
	const navigate = useNavigate();

	const navigateToBaseGeral = () => navigate("/base-geral");
	const navigateToConvocacaoExames = () =>
		navigate("/convocacao-exames-geral");

	return {
		navigateToBaseGeral,
		navigateToConvocacaoExames,
	};
}
