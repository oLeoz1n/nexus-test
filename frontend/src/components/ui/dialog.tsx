import { type ReactNode, useEffect } from "react";

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && open) {
				onOpenChange(false);
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [open, onOpenChange]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm"
				onClick={() => onOpenChange(false)}
			/>
			<div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-auto">
				{children}
			</div>
		</div>
	);
}

interface DialogContentProps {
	children: ReactNode;
	className?: string;
}

export function DialogContent({
	children,
	className = "",
}: DialogContentProps) {
	return (
		<div
			className={`bg-background border border-border rounded-lg shadow-lg ${className}`}
			onClick={e => e.stopPropagation()}
		>
			{children}
		</div>
	);
}

interface DialogHeaderProps {
	children: ReactNode;
	className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
	return (
		<div className={`px-6 py-4 border-b border-border ${className}`}>
			{children}
		</div>
	);
}

interface DialogTitleProps {
	children: ReactNode;
	className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
	return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

interface DialogBodyProps {
	children: ReactNode;
	className?: string;
}

export function DialogBody({ children, className = "" }: DialogBodyProps) {
	return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface DialogFooterProps {
	children: ReactNode;
	className?: string;
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
	return (
		<div
			className={`px-6 py-4 border-t border-border flex justify-end gap-2 ${className}`}
		>
			{children}
		</div>
	);
}
