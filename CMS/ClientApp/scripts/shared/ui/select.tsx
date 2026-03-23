import type { ReactNode } from "react";
import { Label, Select as RadixSelect } from "radix-ui";

// ── Sub-components ───────────────────────────────────────────────────────────

interface SelectTriggerProps {
	placeholder?: string;
}

function SelectTrigger({ placeholder }: SelectTriggerProps) {
	return (
		<RadixSelect.Trigger className="select__trigger">
			<RadixSelect.Value className="select__value" placeholder={placeholder ?? "— выберите —"} />
			<RadixSelect.Icon className="select__icon">
				<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
					<path d="M6 8L1 3h10L6 8z" />
				</svg>
			</RadixSelect.Icon>
		</RadixSelect.Trigger>
	);
}

interface SelectContentProps {
	children: ReactNode;
}

function SelectContent({ children }: SelectContentProps) {
	return (
		<RadixSelect.Portal>
			<RadixSelect.Content className="select__content" position="popper" sideOffset={4}>
				<RadixSelect.ScrollUpButton className="select__scroll-btn" />
				<RadixSelect.Viewport className="select__viewport">{children}</RadixSelect.Viewport>
				<RadixSelect.ScrollDownButton className="select__scroll-btn" />
			</RadixSelect.Content>
		</RadixSelect.Portal>
	);
}

interface SelectItemProps {
	value: string;
	children: ReactNode;
	disabled?: boolean;
}

function SelectItem({ value, children, disabled }: SelectItemProps) {
	return (
		<RadixSelect.Item className="select__item" value={value} disabled={disabled}>
			<RadixSelect.ItemText>{children}</RadixSelect.ItemText>
		</RadixSelect.Item>
	);
}

// ── Root ─────────────────────────────────────────────────────────────────────

interface SelectProps {
	name: string;
	label?: string;
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	required?: boolean;
	disabled?: boolean;
	children: ReactNode;
}

export function Select({ name, label, defaultValue, value, onValueChange, required, disabled, children }: SelectProps) {
	return (
		<div className="select">
			{label && (
				<Label.Root className="select__label" htmlFor={name}>
					{label}
				</Label.Root>
			)}
			<RadixSelect.Root
				name={name}
				defaultValue={defaultValue}
				value={value}
				onValueChange={onValueChange}
				required={required}
				disabled={disabled}
			>
				{children}
			</RadixSelect.Root>
		</div>
	);
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
