import {
	type ReactNode,
	type TdHTMLAttributes,
	type ThHTMLAttributes,
} from "react";
import { cn } from "../../lib/utils";

export function Table({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			className={cn(
				"w-full overflow-x-auto rounded-lg border border-border shadow-sm bg-card",
				className
			)}
		>
			<table className="w-full text-sm">{children}</table>
		</div>
	);
}

export function THead({ children }: { children: ReactNode }) {
	return (
		<thead className="bg-muted/70 text-foreground border-b border-border">
			{children}
		</thead>
	);
}

export function TBody({ children }: { children: ReactNode }) {
	return <tbody className="divide-y divide-border/50">{children}</tbody>;
}

export function TR({
	children,
	className,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<tr
			className={cn("transition-colors hover:bg-muted/40", className)}
			onClick={onClick}
		>
			{children}
		</tr>
	);
}

export function TH({
	children,
	className,
	...rest
}: {
	children: ReactNode;
	className?: string;
} & ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th
			className={cn(
				"px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap",
				className
			)}
			{...rest}
		>
			{children}
		</th>
	);
}

export function TD({
	children,
	className,
	...rest
}: {
	children: ReactNode;
	className?: string;
} & TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td
			className={cn(
				"px-4 py-3 text-foreground/90 whitespace-nowrap",
				className
			)}
			{...rest}
		>
			{children}
		</td>
	);
}
