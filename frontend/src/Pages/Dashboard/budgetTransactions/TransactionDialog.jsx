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
        fixed inset-0 z-50
        flex items-end justify-center           /* <- привязываем вниз по умолчанию */
        bg-black/30
        p-0 md:p-4                              /* на мобиле без внешних полей */
      "
            onMouseDown={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={title || "Dialog"}
        >
            <div
                className="
          w-full max-w-none rounded-t-2xl bg-white p-4  /* bottom-sheet на мобиле */
          md:max-w-lg md:rounded-2xl md:p-4             /* на ПК — центрированная карточка */
        "
                style={{
                    paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
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
