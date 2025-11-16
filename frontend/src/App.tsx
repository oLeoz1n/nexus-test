import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AppRouter } from "./router";

function App() {
	return (
		<div className="min-h-dvh bg-background flex flex-col">
			<Header />
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
				<AppRouter />
			</main>
			<Footer />
		</div>
	);
}

export default App;
