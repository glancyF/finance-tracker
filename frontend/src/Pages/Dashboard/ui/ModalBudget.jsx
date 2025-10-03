import {useEffect,useRef} from "react";


export default function ModalBudget ({open,onClose,title="",children}){
 const dialogRef = useRef(null);
 const lastActiveRef = useRef(null);

    useEffect(() => {
        if(open){
            lastActiveRef.current=document.activeElement;
            setTimeout(()=> dialogRef.current?.focus(),0);
            document.body.style.overflow = "hidden";
        }
        else{
        document.body.style.overflow="";
        lastActiveRef.current?.focus?.();
        }
        return () => (document.body.style.overflow="");
    }, [open]);
    if(!open) return null;
    function onKeyDown(e){
        if(e.key ==='Escape'){
            onClose();
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 budget-modal"
            onKeyDown={onKeyDown}
            aria-modal="true"
            role="dialog"
            aria-label={title || "Dialog"}
        >
            <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
                <div  ref={dialogRef} tabIndex={1} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl outline-none budget-modal__content">

                    {title && (
                        <h2 className="mb-3 text-lg font-semibold text-slate-800">
                            {title}
                        </h2>
                    )}
                    {children}
                    <button
                        type="button"
                        className="absolute right-3 top-3 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
        </div>
    );
}