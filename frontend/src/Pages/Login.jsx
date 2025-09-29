import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header/Header.jsx";
import Button from "../components/ui/Button.jsx";
import Field from "../components/ui/Field.jsx";
import PasswordInput from "../components/ui/PasswordInput.jsx";
import Alert from "../components/ui/Alert.jsx";
import useForm from "../hooks/useForm.js";
import { isEmail} from "../utils/validators.js";
import mapServerErrors from "../utils/mapServerErrors.js";
import { auth } from "../lib/authApi.js";
import { useAuth } from "../features/auth/AuthContext.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
export default function Login (){
    const nav = useNavigate();
    const {user, setUser} = useAuth();
    const { values, setValues,touched,setTouched, errors, setErrors, onChange, onBlur } = useForm({
         email: "", password: ""
    });
    const [loading,setLoading] = useState(false);
    useEffect(() => { if (user) nav("/dashboard", { replace: true }); }, [user, nav]);
    function isStrongPassword(password){
        return password.length >=8;
    }
    function validateField(name) {
        const v = values;
        const e = {};
        if (name === "email" && !isEmail(v.email)) e.email = "Invalid email";
        if(name ==="password" && !isStrongPassword(v.password)) e.password = "Min 8 characters";
        setErrors((prev) => ({ ...prev, ...e, ...(e[name] ? {} : { [name]: undefined }) }));
    }
    function validateAll(){
        const v = values;
        const e = {};
        if(!isEmail(v.email)) e.email = "Invalid email";
        if (!isStrongPassword(v.password)) e.password = "Min 8 characters";
        return e;
    }
    async function submit(e){
        e.preventDefault();
        setTouched({
            email: true,
            password: true
        })
        const ve = validateAll();
        if(Object.keys(ve).length) return setErrors(ve);
        try{
            setLoading(true);
            const {user: logged} = await auth.login({
                email: values.email,
                password: values.password
            });
            setUser(logged);
            nav("/dashboard",{replace: true});
        } catch(err) {
            const mapped = mapServerErrors(err);
            if (err.status === 401 && !mapped._common) {
                mapped._common = "Wrong email or password";
            }
            setErrors(mapped);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <>
        <Header title="Login"/>
        <main className="mx-auto max-w-md px-4 py-10">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                {errors._common && <Alert>{errors._common}</Alert>}
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={values.email}
                    onChange={(e) => { onChange(e); if (touched.email) validateField("email"); }}
                    onBlur={(e) => { onBlur(e); validateField("email"); }}
                    error={touched.email && errors.email}
                    />
                <Field label="Password" required error={touched.password && errors.password}>
                    <PasswordInput
                        name="password"
                        minLength={8}
                        autoComplete="current-password"
                        value={values.password}
                        maxLength={32}
                        onChange={(e) => { onChange(e); if (touched.password) validateField("password"); }}
                        onBlur={(e) => { onBlur(e); validateField("password"); }}/>
                </Field>
                <Button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in" }
                </Button>
                <p className="text-sm text-slate-600">
                    No account yet? <Link to="/register" className="text-emerald-700 underline">Create one</Link>
                </p>
            </form>
        </main>
            <Footer/>
        </>
    );
}