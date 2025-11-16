import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { Table, TBody, TD, TH, THead, TR } from "./ui/table";

export type Column<T> = {
	key: keyof T | string;
	header: string;
	render?: (row: T) => ReactNode;
};

export type DataTableProps<T> = {
	columns: Column<T>[];
	data: T[];
	count: number;
	page: number;
	pageSize: number;
	isLoading?: boolean;
	meta?: {
		next_page: number | null;
		previous_page: number | null;
		total: number;
	};
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	onRowClick?: (row: T) => void;
};

export function DataTable<T extends Record<string, unknown>>({
	columns,
	data,
	page,
	pageSize,
	meta,
	isLoading,
	onPageChange,
	onPageSizeChange,
	onRowClick,
}: DataTableProps<T>) {
	const [jumpToPage, setJumpToPage] = useState("");
	const totalPages = meta?.total ? Math.ceil(meta.total / pageSize) : 0;

	const handleJumpToPage = () => {
		const pageNum = parseInt(jumpToPage, 10);
		if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
			onPageChange(pageNum);
			setJumpToPage("");
		}
	};

	const handlePageSizeChange = (newSize: number) => {
		onPageSizeChange(newSize);
		if (page !== 1) {
			onPageChange(1);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
				<div className="flex items-center gap-2">
					<label className="text-sm text-muted-foreground whitespace-nowrap">
						Linhas por página:
					</label>
					<Select
						value={String(pageSize)}
						onChange={e =>
							handlePageSizeChange(Number(e.target.value))
						}
						className="w-20"
						disabled={isLoading}
					>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</Select>
				</div>

				{totalPages > 1 && (
					<div className="flex items-center gap-2">
						<label className="text-sm text-muted-foreground whitespace-nowrap">
							Ir para página:
						</label>
						<div className="flex gap-2">
							<Input
								type="number"
								min="1"
								max={totalPages}
								value={jumpToPage}
								onChange={e => setJumpToPage(e.target.value)}
								onKeyDown={e =>
									e.key === "Enter" && handleJumpToPage()
								}
								placeholder={`1-${totalPages}`}
								className="w-20"
								disabled={isLoading}
							/>
							<Button
								variant="outline"
								onClick={handleJumpToPage}
								disabled={!jumpToPage || isLoading}
							>
								Ir
							</Button>
						</div>
					</div>
				)}
			</div>

			<Table>
				<THead>
					<TR>
						{columns.map(c => (
							<TH key={String(c.key)}>{c.header}</TH>
						))}
					</TR>
				</THead>
				<TBody>
					{isLoading ? (
						<>
							{Array.from({ length: pageSize }).map((_, idx) => (
								<TR key={idx}>
									{columns.map(c => (
										<TD key={String(c.key)}>
											<Skeleton className="h-4 w-full" />
										</TD>
									))}
								</TR>
							))}
						</>
					) : data.length > 0 ? (
						data.map((row, idx) => (
							<TR
								key={idx}
								onClick={() => onRowClick?.(row)}
								className={
									onRowClick
										? "cursor-pointer hover:bg-accent/50"
										: ""
								}
							>
								{columns.map(c => {
									const value = (
										row as Record<string, unknown>
									)[String(c.key)];
									return (
										<TD key={String(c.key)}>
											{c.render
												? c.render(row)
												: String(value ?? "")}
										</TD>
									);
								})}
							</TR>
						))
					) : (
						<TR>
							<TD
								className="py-12 text-center text-muted-foreground"
								colSpan={columns.length}
							>
								<div className="flex flex-col items-center gap-2">
									<svg
										className="w-12 h-12 text-muted-foreground/40"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									<p className="text-sm font-medium">
										Nenhum registro encontrado
									</p>
									<p className="text-xs">
										Tente ajustar os filtros de busca
									</p>
								</div>
							</TD>
						</TR>
					)}
				</TBody>
			</Table>
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
				<div className="text-sm text-muted-foreground">
					{meta?.total !== undefined ? (
						<>
							Exibindo{" "}
							<span className="font-medium">{data.length}</span>{" "}
							de <span className="font-medium">{meta.total}</span>{" "}
							registros
							{totalPages > 0 && (
								<span className="ml-2">
									• Página {page} de {totalPages}
								</span>
							)}
						</>
					) : (
						`Página ${page}`
					)}
				</div>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="outline"
						onClick={() =>
							meta?.previous_page &&
							onPageChange(meta.previous_page)
						}
						disabled={!meta?.previous_page || isLoading}
						className="cursor-pointer"
					>
						← Anterior
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() =>
							meta?.next_page && onPageChange(meta.next_page)
						}
						disabled={!meta?.next_page || isLoading}
						className="cursor-pointer"
					>
						Próxima →
					</Button>
				</div>
			</div>
		</div>
	);
}
