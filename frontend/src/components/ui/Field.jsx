import Input from "./Input.jsx"

export default function Field({
                                  label,
                                  name,
                                  error,
                                  required,
                                  children,
                                  hint,
                                  ...inputProps
                              }) {
    const id = inputProps.id || name;
    const describedBy = error ? `${id}-error` : hint ? `${id}-hint`:undefined;

    return (
        <div>
            {label && (
                <label htmlFor={id} className="mb-1 block text-sm font-medium">
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}
            {children ? (
                children
            ) : (
                <Input
                    id={id}
                    name={name}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                    required={required}
                    {...inputProps}
                />
            )}
            {hint && !error && (
                <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}