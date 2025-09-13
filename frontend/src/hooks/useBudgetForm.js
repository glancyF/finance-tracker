import { useCallback, useMemo, useState } from "react";
import { validateBudget } from "../utils/budgetValidation";


export default function useBudgetForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});


    const setFieldValue = useCallback((name, value) => {
        setValues((v) => ({ ...v, [name]: value }));
    }, []);


    const validateField = useCallback((field, nextValues) => {
        const full = validateBudget(nextValues ?? values);
        setErrors((prev) => {
            const copy = { ...prev };
            if (full[field]) copy[field] = full[field];
            else delete copy[field];
            return copy;
        });
    }, [values]);


    const handlers = useMemo(() => ({
        text: (name) => ({
            value: values[name] ?? "",
            onChange: (e) => {
                const val = e.target.value;
                setValues((v) => ({ ...v, [name]: val }));
                setTouched((t) => ({ ...t, [name]: true }));
                validateField(name, { ...values, [name]: val });
            },
            onBlur: () => {
                if (touched[name]) validateField(name);
            },
        }),
        select: (name) => ({
            value: values[name] ?? "",
            onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
            onBlur: () => {
                setTouched((t) => ({ ...t, [name]: true }));
                validateField(name);
            },
        }),
    }), [touched, validateField, values]);


    const submit = useCallback(() => {
        const eMap = validateBudget(values);
        setErrors(eMap);
        if (Object.keys(eMap).length) return { ok: false, errors: eMap };
        return { ok: true, data: values };
    }, [values]);


    const reset = useCallback((next = initialValues) => {
        setValues(next);
        setErrors({});
        setTouched({});
    }, [initialValues]);


    return { values, errors, touched, setFieldValue, handlers, validateField, submit, reset };
}