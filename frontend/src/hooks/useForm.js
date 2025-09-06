import {useState} from "react";

export default function useForm(initial){
    const [values,setValues] = useState(initial);
    const [errors,setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const onChange = (e) => {
        const {name,value,type,checked} = e.target;
        setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    };
    const onBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));
    return { values, setValues, errors, setErrors, touched, setTouched, onChange, onBlur };
}