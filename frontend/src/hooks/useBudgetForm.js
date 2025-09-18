import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { validateBudget } from "../utils/budgetValidation";
import {shallowEqual,normalizeForCompare} from "../utils/budgetEquals.js";

export default function useBudgetForm(initialValues, options ={}) {
    const { fields = { name: true, amount: true, currency: true }, trimOnSubmit = true, original } = options;

    const prevInitRef = useRef(initialValues);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (prevInitRef.current !== initialValues) {
            prevInitRef.current = initialValues;
            setValues(initialValues || {});
            setErrors({});
            setTouched({});
        }
    }, [initialValues]);

    const setFieldValue = useCallback((name, value) => {
        setValues((v) => ({ ...v, [name]: value }));
    }, []);


    const validateField = useCallback((field, nextValues) => {
        const full = validateBudget(nextValues ?? values,fields);
        setErrors((prev) => {
            const copy = { ...prev };
            if (full[field]) copy[field] = full[field];
            else delete copy[field];
            return copy;
        });
    }, [values,fields]);


    const handlers = useMemo(
        () => ({
            text: (name) => ({
                value: values[name] ?? "",
                onChange: (e) => {
                    const val = e.target.value;
                    const next = { ...values, [name]: val };
                    setValues(next);
                    setTouched((t) => ({ ...t, [name]: true }));
                    validateField(name, next);
                },
                onBlur: () => { if (touched[name]) validateField(name); },
            }),
            select: (name) => ({
                value: values[name] ?? "",
                onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
                onBlur: () => { setTouched((t) => ({ ...t, [name]: true })); validateField(name); },
            }),
            number: (name) => ({
                value: values[name] ?? "",
                inputMode: "decimal",
                onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
                onBlur: () => { setTouched((t) => ({ ...t, [name]: true })); validateField(name); },
            }),
        }),
        [values, touched, validateField]
    );

    const hasChanges = useMemo(() => {
        const now = normalizeForCompare(values, fields);
        const base = normalizeForCompare(original ?? initialValues ?? {}, fields);
        return !shallowEqual(now, base);
    }, [values, original, initialValues, fields]);

    const submit = useCallback(() => {
        const eMap = validateBudget(values,fields);
        setErrors(eMap);
        if (Object.keys(eMap).length) return { ok: false, errors: eMap };
        if(!hasChanges) return {ok:false, reason: "nochange"};

        const out = {};
        if (fields.name) out.name = trimOnSubmit ? (values.name ?? "").trim() : (values.name ?? "");
        if (fields.amount) out.amount = Number(values.amount);
        if (fields.currency) out.currency = values.currency;

        return { ok: true, data: out };
    }, [values,fields,trimOnSubmit,hasChanges]);


    const reset = useCallback((next = initialValues) => {
        setValues(next);
        setErrors({});
        setTouched({});
    }, [initialValues]);


    return { values, errors, touched, setFieldValue, handlers, validateField, submit, reset, hasChanges };
}