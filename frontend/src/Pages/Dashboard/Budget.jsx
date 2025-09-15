import {useRef, useState, useCallback, use} from "react";
import BudgetHeader from "./budget/BugdetHeader.jsx";
import BudgetList from "./budget/BudgetList.jsx";
import BudgetSummary from "./budget/BudgetSummary.jsx";
import BudgetDialog from "./budget/BudgetDialog.jsx";
import BudgetForm from "./budget/BudgetForm.jsx";
import useBudgetItems from "../../hooks/useBudgetItems.js";
import {CURRENCIES} from "../../utils/budgetConstants.js";

export default function Budget() {
    const {items, total, maxItems, addItem,removeItem} = useBudgetItems([]);
    const [open, setOpen] = useState(false);
    const addBtnRef = useRef(null);

    const openModal = useCallback(() => setOpen(true), []);
    const closeModal = useCallback(() => {
        setOpen(false);
        if (addBtnRef.current && typeof addBtnRef.current.focus === 'function') {
            addBtnRef.current.focus();
        }
    }, [])

    return (
        <div className="space-y-6">
            <BudgetHeader/>

            <BudgetList
                items={items}
                maxItems={maxItems}
                onAddClick={openModal}
                onDeleteItem={removeItem}
                setAddBtnRef={(el) => (addBtnRef.current = el)}
            />

            <BudgetSummary total={total} maxItems={maxItems}/>
            <BudgetDialog open={open} onClose={closeModal} title="Add the budget">
                <BudgetForm
                    initialValues={{name: "", amount: "", currency: CURRENCIES[0]}}
                    onSubmitSuccess={async (data) => {
                        await addItem(data);
                        closeModal();
                    }}
                    onCancel={closeModal}
                />
            </BudgetDialog>
        </div>
    );
}