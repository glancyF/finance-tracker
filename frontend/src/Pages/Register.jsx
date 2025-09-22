import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header/Header.jsx";
import Button from "../components/ui/Button.jsx";
import Field from "../components/ui/Field.jsx";
import PasswordInput from "../components/ui/PasswordInput.jsx";
import Alert from "../components/ui/Alert.jsx";
import useForm from "../hooks/useForm.js";
import { isEmail, isName, isStrongPassword, passMatches } from "../utils/validators.js";
import mapServerErrors from "../utils/mapServerErrors.js";
import { auth } from "../lib/authApi.js";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function Register(){
    const nav = useNavigate();
    const {user,setUser} = useAuth();
    const { values, setValues,touched,setTouched, errors, setErrors, onChange, onBlur } = useForm({
        name: "", email: "", password: "", password_confirmation: "", agree: false,
    });
    const [loading,setLoading] = useState(false);

    useEffect(() => { if (user) nav("/dashboard", { replace: true }); }, [user, nav]);

    function validateField(name){
        const v = values;
        const e = {};
        if(name === "name" && !isName(v.name)) e.name="Name: 3–16 letters, no symbols";
        if (name === "email" && !isEmail(v.email)) e.email = "Invalid email";
        if (name === "password" && !isStrongPassword(v.password))
            e.password = "8–32 chars, at least 1 uppercase and 1 digit";
        if (name === "password_confirmation") {
            if (!isStrongPassword(v.password_confirmation))
                e.password_confirmation = "8–32 chars, 1 uppercase and 1 digit";
            else if (!passMatches(v.password, v.password_confirmation))
                e.password_confirmation = "Passwords do not match";
        }
        if(name==='agree' && !v.agree) e.agree="Accept the terms";
        setErrors((prev) => ({ ...prev, ...e, ...(e[name] ? {} : { [name]: undefined }) }));
    }
    function validateAll(){
        const v = values;
        const e = {};
        if (!isName(v.name)) e.name = "Name: 3–16 letters, no symbols";
        if (!isEmail(v.email)) e.email = "Invalid email";
        if (!isStrongPassword(v.password)) e.password = "8–32 chars, at least 1 uppercase and 1 digit";
        if (!isStrongPassword(v.password_confirmation))
            e.password_confirmation = "8–32 chars, 1 uppercase and 1 digit";
        else if (!passMatches(v.password, v.password_confirmation))
            e.password_confirmation = "Passwords do not match";
        if (!v.agree) e.agree = "Accept the terms";
        return e;
    }
    async function submit(e){
        e.preventDefault();
        setTouched({
            name: true,
            email: true,
            password: true,
            password_confirmation: true,
            agree: true,
        });
        setErrors({})
        const ve = validateAll();
        if(Object.keys(ve).length) return setErrors(ve);
        try {
            setLoading(true);
            const {user: created} = await auth.register({
               name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation
            });
            setUser(created);
            nav("/dashboard", {replace:true});
        } catch (err){
            setErrors(mapServerErrors(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header title="Registration"/>
            <main className="mx-auto max-w-md px-4 py-10">
                <h1 className="text-2xl font-bold">Registration</h1>
                <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                    {errors._common && <Alert>{errors._common}</Alert>}


                    <Field
                        label="Name"
                        name="name"
                        autoComplete="name"
                        required
                        minLength={3}
                        maxLength={16}
                        value={values.name}
                        onChange={(e)=>{onChange(e); if(touched.name) validateField("name");}}
                        onBlur={(e)=>{onBlur(e); validateField("name");}}

                        error={touched.name && errors.name}
                    />
                    <Field
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        minLength={1}
                        maxLength={254}
                        value={values.email}
                        onChange={(e) => {onChange(e); if(touched.email) validateField('email');}}
                        onBlur={(e)=>{onBlur(e); validateField("email");}}
                        error={touched.email && errors.email}
                    />

                    <Field label="Password" required error={touched.password && errors.password}>
                        <PasswordInput
                            name="password"
                            minLength={8}
                            maxLength={32}
                            autoComplete="new-password"
                            value={values.password}
                            onChange={(e) => {onChange(e); if(touched.password) validateField('password');}}
                            onBlur={(e)=>{onBlur(e); validateField("password");}}

                        />
                    </Field>
                    <Field label="Confirm password" required error={touched.password_confirmation&& errors.password_confirmation}>
                        <PasswordInput
                            name="password_confirmation"
                            minLength={8}
                            autoComplete="new-password"
                            maxLength={32}
                            value={values.password_confirmation}
                            onChange={(e) => {onChange(e); if(touched.password_confirmation) validateField('password_confirmation');}}
                            onBlur={(e)=>{onBlur(e); validateField("password_confirmation");}}
                        />
                    </Field>

                    <label className="flex items-start gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={values.agree}
                            onChange={(e)=>{ onChange(e); if (touched.agree) validateField("agree"); }}
                            onBlur={(e)=>{ onBlur(e); validateField("agree"); }}
                            required
                        />
                        <span>
                            I agree with the terms
                        </span>
                    </label>
                    {errors.agree && touched.agree && <p className="mt-1 text-sm text-red-600">{errors.agree}</p>}

                    <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</Button>
                    <p className="text-sm text-slate-600">
                        Do you have an account? <Link to="/login" className="text-emerald-700 underline">Log in</Link>
                    </p>
                </form>
            </main>
        </>
    )

}