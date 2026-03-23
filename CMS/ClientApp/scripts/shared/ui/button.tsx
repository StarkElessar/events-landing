import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "radix-ui";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean;
	children: ReactNode;
}

export function Button({ variant = "primary", size = "default", asChild, className, children, ...props }: ButtonProps) {
	const Comp = asChild ? Slot.Root : "button";

	const classes = ["btn", `btn_${variant}`, size === "sm" && "btn_sm", className].filter(Boolean).join(" ");

	return (
		<Comp className={classes} {...props}>
			{children}
		</Comp>
	);
}
