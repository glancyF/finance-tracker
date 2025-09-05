import {useState} from "react";

export default function useForm(initial){
    const [values,setValues] = useState(initial);
    const [errors,setErrors] = useState({});

    const onChange = (e) => {
        const {name,value,type,checked} = e.target;
        setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    };
    return {values,setValues,errors,setErrors,onChange};
}