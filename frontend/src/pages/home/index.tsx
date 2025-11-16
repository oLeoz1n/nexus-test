import { Button } from "../../components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card.tsx";
import { useHome } from "./useHome.ts";

export default function HomePage() {
	const { navigateToBaseGeral, navigateToConvocacaoExames } = useHome();

	return (
		<div className="space-y-8">
			<div className="text-center space-y-3">
				<h1 className="text-4xl font-bold tracking-tight">
					Nexus Test
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					Sistema de gerenciamento de solicitações e convocações de
					exames
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
				<Card
					className="transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
					onClick={navigateToBaseGeral}
				>
					<CardHeader>
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<CardTitle className="text-xl">
									Base Geral
								</CardTitle>
							</div>
							<svg
								className="w-5 h-5 text-muted-foreground"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Visualize e gerencie registros da base geral de
							solicitações de exames com filtros avançados
						</p>
						<Button
							variant="ghost"
							className="mt-4 px-0 hover:bg-transparent"
						>
							Acessar módulo →
						</Button>
					</CardContent>
				</Card>

				<Card
					className="transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
					onClick={navigateToConvocacaoExames}
				>
					<CardHeader>
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-secondary/20">
									<svg
										className="w-6 h-6 text-secondary-foreground"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
								<CardTitle className="text-xl">
									Convocação de Exames
								</CardTitle>
							</div>
							<svg
								className="w-5 h-5 text-muted-foreground"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Acompanhe convocações, situações e periodicidade de
							exames dos colaboradores
						</p>
						<Button
							variant="ghost"
							className="mt-4 px-0 hover:bg-transparent"
						>
							Acessar módulo →
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
