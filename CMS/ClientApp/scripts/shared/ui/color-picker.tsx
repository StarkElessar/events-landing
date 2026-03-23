import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
	name: string;
	label: string;
	value: string;
	onChange?: (value: string) => void;
}

export function ColorPicker({ name, label, value, onChange }: ColorPickerProps) {
	const [open, setOpen] = useState(false);
	const [color, setColor] = useState(value || "#000000");

	const handleChange = (newColor: string) => {
		setColor(newColor);
		onChange?.(newColor);
	};

	return (
		<div className="color-picker">
			<input type="hidden" name={name} value={color} />
			<label className="color-picker__label">{label}</label>
			<div className="color-picker__trigger-wrap">
				<button
					type="button"
					className="color-picker__trigger"
					style={{ background: color }}
					onClick={() => setOpen((v) => !v)}
					aria-label={`Выбрать цвет: ${label}`}
				>
					<span className="color-picker__hex">{color}</span>
				</button>
				{open && (
					<div className="color-picker__popover">
						<HexColorPicker color={color} onChange={handleChange} />
						<button type="button" className="color-picker__close" onClick={() => setOpen(false)}>
							Готово
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
