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
import { auth } from "../lib/api.js";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function Register(){
    const nav = useNavigate();
    const {user,setUser} = useAuth();
    const { values, setValues, errors, setErrors, onChange } = useForm({
        name: "", email: "", password: "", password_confirmation: "", agree: false,
    });
    const [loading,setLoading] = useState(false);

    useEffect(() => { if (user) nav("/dashboard", { replace: true }); }, [user, nav]);

    function validate() {
        const e = {}
        if(!isName(values.name)) e.name = "The name must be between 3 to 16 symbols, without any special symbols";
        if(!isEmail(values.email)) e.email = "Wrong email";
        if(!isStrongPassword(values.password)) e.password = "The password must include one upper case letter, one digit, the password`s length must be between from 8 to 32 symbols";
        if(!isStrongPassword(values.password_confirmation)) e.password_confirmation = "The password must include one upper case letter, one digit, the password`s length must be between from 8 to 32 symbols";
        if(!passMatches(values.password, values.password_confirmation)) e.password_confirmation = "Passwords are not the same!"
        if(!values.agree) e.agree = "Accept the therms"
        return e;
    }
    async function submit(e){
        e.preventDefault();
        setErrors({})
        const ve = validate();
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
            <Header/>
            <main className="mx-auto max-w-md px-4 py-10">
                <h1 className="text-2xl font-bold">Registration</h1>
                <form onSubmit={submit} className="mt-6 space-y-4">
                    {errors._common && <Alert>{errors._common}</Alert>}
                    <Field label="Name" name="name" value={values.name} onChange={onChange} error={errors.name}/>
                    <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email}/>
                    <Field label="Password" error={errors.password}>
                        <PasswordInput name="password" value={values.password} onChange={onChange}/>
                    </Field>
                    <Field label="Confirm password" error={errors.password_confirmation}>
                        <PasswordInput name="password_confirmation" value={values.password_confirmation} onChange={onChange}/>
                    </Field>

                    <label className="flex items-start gap-2 text-sm">
                        <input type="checkbox" name="agree" checked={values.agree} onChange={onChange} className="mt-1"/>
                        <span>
                            I agree with the therms
                        </span>
                    </label>
                    {errors.agree && <p className="mt-1 text-sm text-red-600">{errors.agree}</p>}

                    <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</Button>
                    <p className="text-sm text-slate-600">
                        Do you have an account? <Link to="/login" className="text-emerald-700 underline">Log in</Link>
                    </p>
                </form>
            </main>
        </>
    )

}