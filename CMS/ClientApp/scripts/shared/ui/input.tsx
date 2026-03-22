import type { InputHTMLAttributes } from 'react';
import { Label } from 'radix-ui';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export function Input({ label, name, error, className, ...props }: InputProps) {
	return (
		<div className="input">
			<Label.Root className="input__label" htmlFor={name}>
				{label}
			</Label.Root>
			<input
				id={name}
				name={name}
				className={['input__field', error && 'input__field_error', className].filter(Boolean).join(' ')}
				aria-describedby={error ? `${name}-error` : undefined}
				aria-invalid={!!error}
				{...props}
			/>
			{error && (
				<span id={`${name}-error`} className="input__error">
					{error}
				</span>
			)}
		</div>
	);
}
