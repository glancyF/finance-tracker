export default function NavLinks({items = [], onItemClick}){
    return (
        <>
            {items.map(n => (
                <a
                    key={n.href}
                    href={n.href}
                    onClick={onItemClick}
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                    {n.label}
                </a>
            ))}
        </>
    );
}