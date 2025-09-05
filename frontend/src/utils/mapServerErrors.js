export default function mapServerErrors(err) {
    if (err?.status === 422) {
        const obj = err.data?.errors || {};
        return Object.fromEntries(Object.entries(obj).map(([k, arr]) => [k, arr[0]]));
    }
    return { _common: err?.message || "Error" };
}