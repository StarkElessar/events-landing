import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

interface BaseFieldProps {
	label: string;
	name: string;
	error?: string;
}

type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };
type TextareaFieldProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' };
type SelectFieldProps = BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement> & { as: 'select'; children: ReactNode };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
	const { label, name, error } = props;
	const tag = (props as { as?: string }).as ?? 'input';

	// Omit our custom props before spreading onto the DOM element
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { label: _l, error: _e, as: _as, ...fieldProps } = props as unknown as Record<string, unknown>;

	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			{tag === 'textarea' ? (
				<textarea id={name} {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
			) : tag === 'select' ? (
				<select id={name} {...(fieldProps as SelectHTMLAttributes<HTMLSelectElement>)}>
					{(props as SelectFieldProps).children}
				</select>
			) : (
				<input id={name} {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)} />
			)}
			{error && <span className="form-error">{error}</span>}
		</div>
	);
}
