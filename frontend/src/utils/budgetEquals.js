export function normalizeForCompare(values,fields) {
    const out = {};
    if(fields.name) out.name = (values?.name ?? "").trim();
    if(fields.amount) out.amount = Number(values.amount ?? "")
    if (fields.currency) out.currency = values?.currency ?? "";
    return out;
}

export function shallowEqual(a,b) {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if(ka.length !== kb.length) return false;
    for (const k of ka){
        if (a[k] !== b[k]) return false;
    }
    return true;
}