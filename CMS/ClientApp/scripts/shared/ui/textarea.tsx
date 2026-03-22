import type { TextareaHTMLAttributes } from 'react';
import { Label } from 'radix-ui';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	error?: string;
}

export function Textarea({ label, name, error, className, ...props }: TextareaProps) {
	return (
		<div className="textarea">
			<Label.Root className="textarea__label" htmlFor={name}>
				{label}
			</Label.Root>
			<textarea
				id={name}
				name={name}
				className={['textarea__field', error && 'textarea__field_error', className].filter(Boolean).join(' ')}
				aria-describedby={error ? `${name}-error` : undefined}
				aria-invalid={!!error}
				{...props}
			/>
			{error && (
				<span id={`${name}-error`} className="textarea__error">
					{error}
				</span>
			)}
		</div>
	);
}
