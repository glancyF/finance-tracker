import TransactionForm from "./TransactionForm.jsx";
import {useEffect} from "react";

export default function TransactionDialog ({open,onClose,title,children,...formProps}){
    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        const prevPadRight = document.body.style.paddingRight;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

        return () => {
            document.body.style.overflow = prevOverflow || "";
            document.body.style.paddingRight = prevPadRight || "";
        };
    }, [open]);

    if (!open) return null;
    return (
        <div
            className="
        fixed inset-0 z-50 bg-black/30
        flex items-end justify-center p-0
        md:items-center md:p-4
      "
            onMouseDown={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
        >
            <div data-trx-modal-content
                className="
          w-full max-w-none rounded-t-2xl bg-white p-4
          max-h-[90vh] overflow-y-auto
          md:max-w-lg md:rounded-2xl md:max-h-none md:overflow-visible
        "
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
                </div>

                <TransactionForm {...formProps} onCancel={onClose} />
            </div>
        </div>
    );
}
