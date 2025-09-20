const NAME_RE = /^[\p{L}\p{M}\p{N}\s-]+$/u;


export function Validation(values = {}) {
    const e = {};
    const type = values.type;
    const amountRaw = values.amount ?? "";
    const date = values.date ?? "";
    const comment = values.comment ?? "";
    if(type !== "income" && type !== "expense") e.type="Required";
    const num = Number(amountRaw);
    if(amountRaw === "" || Number.isNaN(num)) e.amount="Enter the number";
    else if(num <= 0 ) e.amount = "Must be >0";
    else if (num > 999_999_999_999.99) e.amount = "Too high";

    if(!date) e.date = "Required";

    const hasId = !!values.category_id;
    const hasName = !!(values.category_name && values.category_name.trim());
    if (!hasId && !hasName) {
        e.category = "Select or enter a category";
    } else if (hasName) {
        const name = values.category_name.trim();
        if (!NAME_RE.test(name)) e.category = "Invalid symbols";
        else if (name.length > 64) e.category = "Too long";
    }

    if(comment) {
        if(!NAME_RE.test(comment)) e.comment ="Invalid symbols";
        else if(comment.length > 255) e.comment ="Max 255";
    }

    return e;
}