import clsx from "../../utils/clsx.js";
export default function Input({className, ...props}) {
    return (
        <input
            className={clsx(
                "w-full rounded-lg border border-slate-300 px-3 py-2",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500",
                className
            )}
            {...props}
        />
    )
}
