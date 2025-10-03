

export default function Pager({meta,page,setPage}) {
    const canPrev = page > 1;
    const canNext = page < (meta?.last_page ?? 1);

    return (
        <div data-pager className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <div>
                {meta?.from ?? 0}–{meta?.to ?? 0} из {meta?.total ?? 0}
            </div>
            <div className="flex gap-2">
                <button
                    className="rounded-lg px-3 py-1 border border-slate-200 disabled:opacity-50"
                    disabled={!canPrev}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    ← Prev
                </button>
                <span className="px-2">Page {page} / {meta?.last_page ?? 1}</span>
                <button
                    className="rounded-lg px-3 py-1 border border-slate-200 disabled:opacity-50"
                    disabled={!canNext}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}