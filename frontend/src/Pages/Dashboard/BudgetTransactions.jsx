import {useParams} from "react-router-dom";
import useTransactions from "../../hooks/useTransactions.js";
import {useEffect, useMemo, useState} from "react";
import {budgetApi} from "../../lib/budgetApi.js";
import Alert from "../../components/ui/Alert.jsx";
import Button from "../../components/ui/Button.jsx";
import TransactionList from "./budgetTransactions/TransactionList.jsx";
import TransactionDialog from "./budgetTransactions/TransactionDialog.jsx";


export default function BudgetTransactions() {
    const {id} = useParams();
    const budgetId = Number(id);
    const { items, loading, error, add, update, remove } = useTransactions(budgetId);
    const [budget,setBudget] = useState(null);
    const [open,setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        let active = true;
        (async () =>{
            try{
                const res = await budgetApi.list();
                const found = (res.data || []).find(b => Number(b.id) === budgetId) || null;
                if(active) setBudget(found);

            }catch{}
        })();
        return () => {active =false};
    }, [budgetId]);

    const totals = useMemo(() => {
        let inc = 0, exp = 0;
        for (const t of items) {
            const amt = Number(t.amount || 0);
            if (t.type === "income") inc += amt;
            else exp += amt;
        }
        return { income: inc, expense: exp, balance: inc - exp };
    }, [items]);

    return(
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
            {error && <Alert variant="error">{error}</Alert>}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        {budget?.name || "Budget"} {budget?.currency ? `(${budget.currency})` : ""}
                    </h1>
                    <p className="text-sm text-slate-500">
                        Income: {totals.income.toLocaleString()} · Expense: {totals.expense.toLocaleString()} · Balance:{" "}
                        <span className={totals.balance >= 0 ? "text-emerald-700" : "text-red-700"}>
              {totals.balance.toLocaleString()}
            </span>
                    </p>
                </div>
                <Button onClick={()=> {setEditItem(null); setOpen(true);}}>Add transaction</Button>
            </div>

            <TransactionList
                items={items}
                currency={budget?.currency || "USD"}
                onEdit={(t) => {setEditItem(t); setOpen(true)}}
                onDelete={(id)=> {if (confirm("Delete transaction")) remove(id)}}
                loading={loading}/>
            <TransactionDialog
                open={open}
                onClose={() => setOpen(false)}
                title={editItem ? "Edit transaction" : "New transaction"}
                budgetId={budgetId}
                currency={budget?.currency || "USD"}
                initialValues={
                    editItem
                        ? { type: editItem.type, amount: String(editItem.amount), date: editItem.date, category_id: editItem.category?.id || null, category_name: "", comment: editItem.comment || "" }
                        : { type: "expense", amount: "", date: new Date().toISOString().slice(0,10), category_id: null, category_name: "", comment: "" }
                }
                onSubmit={async(payload) => {
                    if(editItem) await update(editItem.id,payload);
                    else await add(payload);
                    setOpen(false);
                }}/>
        </div>
    );
}