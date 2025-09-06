export default function Alert( {children,variant ="error"}){
    const styles = variant === "error"
        ? "bg-red-50 text-red-700"
        : "bg-emerald-50 text-emerald-700";
    return <div className={`rounded-lg px-3 py-2 text-sm ${styles}`}>{children}</div>;
}