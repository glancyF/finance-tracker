export default function MobileMenu({open,onClose,links,actions}){
    if(!open) return null;
    return(
        <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
                <div className="flex flex-col gap-1">{links}</div>
                <div className="mt-2 flex gap-2">{actions}</div>

            </nav>
        </div>
    );
}