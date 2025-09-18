import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {useState} from "react";

export default function DeleteBudgetButton({id,onDelete}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleClick = async () => {
        if (!confirm("Delete this budget?")) return;
        try{
            setIsDeleting(true)
            await onDelete?.(id);
        }
        finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isDeleting}
            className="text-slate-400 hover:text-red-600"
            title="Delete budget"
            aria-label="Delete budget"
        >
            <XMarkIcon className="h-5 w-5" />
        </button>
    )
}