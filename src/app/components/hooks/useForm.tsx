import {useState, useRef} from 'react';

interface Validation {
	required?: string;
	pattern?: {
		value: string;
		message: string;
	};
	custom?: {
		isValid: (value: string) => boolean;
		message: string;
	};
}
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
	validations?: Validations<T>;
	initialValue?: Partial<T>;
}) => {
	const [data, setData] = useState<T>((options?.initialValue || {}) as T);
	const [errors, setErrors] = useState<ErrorRecord<T>>({});

	const handleChange =
		<S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
		(e: string) => {
			const value = sanitizeFn ? sanitizeFn(e) : e;
			setData((_data) => ({..._data, [key]: value}));
		};

	const handleSubmit = () => {
		const validations = options?.validations;
		const newErrors: ErrorRecord<T> = {};
		if (validations) {
			for (const key in validations) {
				const value = data[key];
				const validation = validations[key];
				if (validation?.required && !value) {
					newErrors[key] = validation?.required;
				}

				const pattern = validation?.pattern;
				if (pattern?.value && !RegExp(pattern.value).test(value)) {
					newErrors[key] = pattern.message;
				}

				const custom = validation?.custom;
				if (custom?.isValid && !custom.isValid(value)) {
					newErrors[key] = custom.message;
				}
			}
			setErrors(newErrors);
		}
		return newErrors;
	};
	return {
		data,
		errors,
		handleChange,
		handleSubmit,
	};
};
