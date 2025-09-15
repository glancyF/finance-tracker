const NAME_RE = /^[\p{L}\p{M}\p{N}\s-]+$/u;

export function validateBudget(values) {
    const e = {};
    const name = (values.name ?? "").trim();
    const amountRaw = values.amount ?? "";
    if(!name) e.name ="Required";
    else {
        if (!NAME_RE.test(name)) e.name = "Invalid symbols";
        if (name.length > 64) e.name = "The length of budget's name can't be more than 64 letters";
    }
    const num = Number(amountRaw);
    if(amountRaw === "" || Number.isNaN(num)) e.amount = "Enter the number";
    else if(num<0) e.amount ="Must be ≥ 0";
    if(num>999_999_999_999.99) e.amount ="Too high";
    if (!values.currency) e.currency = "Choose the currency";
    return e;
}