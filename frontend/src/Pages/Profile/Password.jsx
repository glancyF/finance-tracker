import { useState } from "react";
import Field from "../../components/ui/Field.jsx";
import Button from "../../components/ui/Button.jsx";
import Alert from "../../components/ui/Alert.jsx";
import useForm from "../../hooks/useForm.js";
import {isStrongPassword, passMatches} from "../../utils/validators.js";
import mapServerErrors from "../../utils/mapServerErrors.js";
import { userApi } from "../../lib/api.js";

import PasswordInput from "../../components/ui/PasswordInput.jsx";

export default function PasswordProfile() {
    const {
        values, setValues, touched, setTouched, errors, setErrors, onChange, onBlur,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [ok, setOk] = useState("")

    const [loading, setLoading] = useState(false);
    function validateField(name) {
        const v = values;
        const e = {};
        if(name === "current_password" && !v.current_password) e.current_password = "Required";
        if(name === "password" && !isStrongPassword(v.password)) e.password = "8–32 chars, at least 1 uppercase and 1 digit";
        if (name === "password_confirmation") {
            if(!isStrongPassword(v.password_confirmation)) e.password_confirmation = "8–32 chars, 1 uppercase and 1 digit";
            else if(!passMatches(v.password, v.password_confirmation)) e.password_confirmation = "Passwords do not match";
        }
        setErrors((prev) => ({ ...prev, ...e, ...(e[name] ? {} : { [name]: undefined }) }));
        return e;
    }

    function validateAll() {
        const v = values;
        const e = {};
        if (!v.current_password) e.current_password = "Required";
        if (!isStrongPassword(v.password)) e.password = "8–32 chars, at least 1 uppercase and 1 digit";
        if (!isStrongPassword(v.password_confirmation))
            e.password_confirmation = "8–32 chars, 1 uppercase and 1 digit";
        else if (!passMatches(v.password, v.password_confirmation))
            e.password_confirmation = "Passwords do not match";
        return e;
    }

    async function submit(e) {
        e.preventDefault();
        setErrors({});
        setTouched({
            current_password: true,
            password: true,
            password_confirmation: true,
        });
        const ve = validateAll();
        if(Object.keys(ve).length) return setErrors(ve);
        try{
            setLoading(true);
            await userApi.updatePassword({
                current_password: values.current_password,
                password: values.password,
                password_confirmation: values.password_confirmation,
            });
            setValues({current_password: "", password: "", password_confirmation: ""});
            setErrors({});
            setOk("Password updated")
        } catch(err) {
            const mapped = mapServerErrors(err);
            if(err.status === 401 && !mapped._common) mapped._common = "Wrong password";
            setErrors(mapped)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submit} noValidate className="space-y-4 max-w-lg">
            {errors._common && <Alert variant="error">{errors._common}</Alert>}
            {ok && <Alert variant="success">{ok}</Alert>}
            <Field label="Current password" required error={touched.current_password && errors.current_password}>
                <PasswordInput
                    name="current_password"
                    value={values.current_password}
                    onChange={(e) => { onChange(e); if (touched.current_password) validateField("current_password"); }}
                    onBlur={(e) => { onBlur(e); validateField("current_password"); }}
                    minLength={8}
                    maxLength={32}
                />
            </Field>

            <Field label="New password" required error={touched.password && errors.password}>
                <PasswordInput
                    name="password"
                    value={values.password}
                    onChange={(e) => { onChange(e); if (touched.password) validateField("password"); }}
                    onBlur={(e) => { onBlur(e); validateField("password"); }}
                    minLength={8}
                    maxLength={32}
                />
            </Field>

            <Field label="Confirm password" required error={touched.password_confirmation && errors.password_confirmation}>
                <PasswordInput
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={(e) => { onChange(e); if (touched.password_confirmation) validateField("password_confirmation"); }}
                    onBlur={(e) => { onBlur(e); validateField("password_confirmation"); }}
                    minLength={8}
                    maxLength={32}
                />
            </Field>

            <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update password"}
            </Button>
        </form>
    );

}