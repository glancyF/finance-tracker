import { AiTwotoneEdit } from 'react-icons/ai';
export default function EditBudgetButton({id, onEdit,name}) {
    return (
        <button
            type="button"
            onClick={() => onEdit?.({ id, name })}
            className="rounded p-1 text-slate-400 hover:text-emerald-700"
            aria-label="Edit name"
            title="Edit name">
            <AiTwotoneEdit className="h-5 w-5"/>
        </button>
    )
}