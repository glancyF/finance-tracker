import ModalBudget from "../ui/ModalBudget.jsx";

export default function BudgetDialog({open,onClose,title,children}){
    return (
        <ModalBudget open={open} onClose={onClose} title={title}>
            {children}
        </ModalBudget>
    );
}