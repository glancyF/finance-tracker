import Input from "./Input.jsx"

export default function Field ({label,error,children,...InputProps}){
    return(
        <div>
            {label && <label className="mb-1 block text-sm font-medium">{label}</label> }
            {children ? children : <Input {...InputProps}/>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}