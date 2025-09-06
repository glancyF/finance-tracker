import clsx from "../../utils/clsx.js"

export default function Button ({as = "button",className,children,...props}){
    const Comp = as;
    return (
        <Comp
            className={clsx(
                "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold",
                "bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60",
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
}