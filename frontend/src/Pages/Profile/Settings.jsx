import { useState } from "react";
import Field from "../../components/ui/Field.jsx";
import Button from "../../components/ui/Button.jsx";
import Alert from "../../components/ui/Alert.jsx";
import useForm from "../../hooks/useForm.js";
import { isEmail, isName } from "../../utils/validators.js";
import mapServerErrors from "../../utils/mapServerErrors.js";
import { userApi } from "../../lib/userApi.js";
import { useAuth } from "../../features/auth/AuthContext.jsx";

export default function ProfileSettings(){
   const {user,setUser} = useAuth();
   const {values,touched,setTouched, errors, setErrors,setValues, onChange,onBlur}= useForm({name: user?.name || "", email: user?.email || ""});
   const [saving, setSaving] = useState(false);
   const [ok, setOk] = useState("");


   function validateField(name) {
       const v = values;
       const e = {};
       if(name === 'name' && !isName(v.name.trim())) e.name ="Name: 3-16 letters, no symbols";
       if (name === 'email' && !isEmail(v.email.trim())) e.email ="Invalid email";
       setErrors((prev) => ({ ...prev, ...e, ...(e[name] ? {} : { [name]: undefined }) }));
       return e;
   }
   function validateAll(v){
       const e = {};
       if(!isName(v.name)) e.name ="Name: 3-16 letters, no symbols";
       if(!isEmail(v.email)) e.email="Invalid email";
       return e;
   }
   async function submit(e) {
       e.preventDefault();
       if (saving) return;

       setOk("");
       setErrors({});
       setTouched({name: true, email: true});

       const v = { name: values.name.trim(), email: values.email.trim().toLowerCase() };
       const curr = {
           name: (user?.name || "").trim(),
           email: (user?.email || "").trim().toLowerCase(),
       };
       if (v.name === curr.name && v.email === curr.email) {
           setOk("");
           setErrors({_common: "Nothing to update"});
           return;
       }
       const ve = validateAll(v);

       if (Object.keys(ve).length) return setErrors(ve);
       setSaving(true);
       try {

           const {user: updated} = await userApi.updateProfile({
               name: v.name,
               email: v.email,
           });
           setUser(updated)
           setValues({ name: updated.name, email: updated.email });
           setOk("Profile saved");
       } catch (err) {
           setErrors(mapServerErrors(err))
       } finally {
           setSaving(false);
       }
   }

       return (
           <form onSubmit={submit} noValidate className="space-y-4 max-w-lg">
               <h2 className="text-xl font-bold">Settings</h2>
               {errors._common && <Alert variant="error">{errors._common}</Alert>}
               {ok && <Alert  variant="success">{ok}</Alert>}

               <Field
                   label="Name"
                   name="name"
                   autoComplete="name"
                   required
                   minLength={3}
                   maxLength={16}
                   value={values.name}
                   onChange={(e)=>{ onChange(e); if (touched.name) validateField("name"); }}
                   onBlur={(e)=>{ onBlur(e); validateField("name"); }}
                   error={touched.name && errors.name}
               />

               <Field
                   label="Email"
                   name="email"
                   type="email"
                   autoComplete="email"
                   required
                   maxLength={254}
                   value={values.email}
                   onChange={(e)=>{ onChange(e); if (touched.email) validateField("email"); }}
                   onBlur={(e)=>{ onBlur(e); validateField("email"); }}
                   error={touched.email && errors.email}
               />

               <Button type="submit" disabled={saving}>
                   {saving ? "Saving..." : "Save"}
               </Button>
           </form>
       );

}
