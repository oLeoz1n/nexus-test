import { Link, useLocation } from "react-router-dom";

export function Header() {
	const location = useLocation();

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
					>
						<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
							N
						</div>
						<span className="hidden sm:inline">Nexus Test</span>
					</Link>
					<nav className="flex items-center gap-2 sm:gap-6">
						<Link
							to="/base-geral"
							className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
								location.pathname === "/base-geral"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							}`}
						>
							Base Geral
						</Link>
						<Link
							to="/convocacao-exames-geral"
							className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
								location.pathname === "/convocacao-exames-geral"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							}`}
						>
							<span className="hidden sm:inline">
								Convocação de Exames
							</span>
							<span className="sm:hidden">Convocações</span>
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
