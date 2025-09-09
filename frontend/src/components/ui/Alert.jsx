export default function Alert( {children,variant ="error"}){
    const variants = {
        error: "bg-red-50 text-red-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-yellow-50 text-yellow-700",
        info: "bg-blue-50 text-blue-700",
    };
    const styles = variants[variant] || variants.error;
    return (
        <div className={`rounded-lg px-3 py-2 text-sm ${styles}`}>
            {children}
        </div>
    );
}