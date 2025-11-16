import { Route, Routes } from "react-router-dom";
import BaseGeralListPage from "./pages/base-geral-list";
import ConvocacaoExamesGeralListPage from "./pages/convocacao-exames-geral-list";
import HomePage from "./pages/home";

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/base-geral" element={<BaseGeralListPage />} />
			<Route
				path="/convocacao-exames-geral"
				element={<ConvocacaoExamesGeralListPage />}
			/>
		</Routes>
	);
}
