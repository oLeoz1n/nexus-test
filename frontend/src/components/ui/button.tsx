import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "secondary" | "ghost";
	size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = "default", size = "md", disabled, ...props },
		ref
	) => {
		const base =
			"inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed";
		const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
			default:
				"bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow",
			outline:
				"border-2 border-border bg-background hover:bg-accent hover:border-primary/50",
			secondary:
				"bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
			ghost: "hover:bg-accent hover:text-accent-foreground",
		};
		const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
			lg: "h-11 px-6 text-base",
		};
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={cn(base, variants[variant], sizes[size], className)}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";
