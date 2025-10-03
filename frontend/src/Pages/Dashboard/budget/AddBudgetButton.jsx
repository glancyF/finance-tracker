export default function AddBudgetButton({onClick,setAddBtnRef}) {
    return (
        <button type="button" data-budget-add
                ref={setAddBtnRef}
                onClick={onClick}
                className="h-[120px] w-full rounded-2xl border border-emerald-300 border-dashed bg-white p-4 text-slate-500 hover:border-emerald-400 hover:text-emerald-700"
                >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300">
                <span className="text-2xl">＋</span>
            </div>
            <p className="mt-2 text-sm font-medium text-center">Add</p>
        </button>
    );
}