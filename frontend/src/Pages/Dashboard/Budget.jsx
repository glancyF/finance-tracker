import {useRef, useState, useCallback, use} from "react";
import BudgetHeader from "./budget/BugdetHeader.jsx";
import BudgetList from "./budget/BudgetList.jsx";
import BudgetSummary from "./budget/BudgetSummary.jsx";
import BudgetDialog from "./budget/BudgetDialog.jsx";
import BudgetForm from "./budget/BudgetForm.jsx";
import useBudgetItems from "../../hooks/useBudgetItems.js";
import {CURRENCIES} from "../../utils/budgetConstants.js";
import Spinner from "../../components/ui/Spinner.jsx";

export default function Budget() {
    const {items, total, maxItems, addItem,removeItem,updateItem,loading} = useBudgetItems([]);
    const [open, setOpen] = useState(false);
    const addBtnRef = useRef(null);
    const [mode, setMode] = useState("create");
    const [editing, setEditing] = useState(null);
    const openCreate = useCallback(() => {
        setMode("create");
        setEditing(null);
        setOpen(true);
    }, []);

    const openEdit = useCallback((item) => {
        setMode("edit");
        setEditing(item);
        setOpen(true);
    }, []);
    const closeModal = useCallback(() => {
        setOpen(false);
        if (addBtnRef.current && typeof addBtnRef.current.focus === 'function') {
            addBtnRef.current.focus();
        }
    }, [])

    if(loading) {
        return (<div className="center-loading"><Spinner/></div>);
    }

    return (
        <div className="space-y-6">
            <BudgetHeader/>

            <BudgetList
                items={items}
                maxItems={maxItems}
                onAddClick={openCreate}
                onEditItem={openEdit}
                onDeleteItem={removeItem}
                setAddBtnRef={(el) => (addBtnRef.current = el)}
            />

            <BudgetSummary total={total} maxItems={maxItems}/>
            <BudgetDialog open={open} onClose={closeModal} title={mode === "edit" ? "Edit budget" : "Add the budget"}>
                {mode === "create" ? (
                <BudgetForm
                    mode="create"
                    fields={{name:true,amount:true,currency:true}}
                    initialValues={{name: "", amount: "", currency: CURRENCIES[0]}}
                    onSubmitSuccess={async (data) => {
                        await addItem(data);
                        closeModal();
                    }}
                    onCancel={closeModal}

                />) : (
                    <BudgetForm
                        mode="edit"
                        fields={{ name: true, amount: false, currency: false }}
                        initialValues={{ name: editing?.name ?? "" }}
                        original={{ name: editing?.name ?? "" }}
                        onSubmitSuccess={async (data) => {
                            await updateItem(editing.id, data);
                            closeModal();
                        }}
                        onCancel={closeModal}
                    />
                )}
            </BudgetDialog>
        </div>
    );
}