import BudgetCard from "../ui/BudgetCard.jsx";
import AddBudgetButton from "./AddBudgetButton.jsx";

export default function BudgetList({items,maxItems,onAddClick,setAddBtnRef, onDeleteItem,onEditItem}){
    return(
        <div data-budget-grid className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((i) => (
                <div data-budget-cardwrap key={i?.id} className="h-[120px]">
                    <BudgetCard id={i?.id} name={i?.name ?? ""} amount={i?.amount ?? ""} currency={i?.currency ?? ""} className="h-full" onDelete={onDeleteItem} onEditItem={onEditItem}/>
                </div>
            ))}
            {items.length <maxItems &&(
                <AddBudgetButton onClick={onAddClick} setAddBtnRef={setAddBtnRef}/>
            )}
        </div>
    );
}