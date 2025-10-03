import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import reg from "../../../assets/carousel.jpg";
import balance from "../../../assets/balance.jpg";
import budget from "../../../assets/budget.jpg";
import budgetModal from "../../../assets/budgetModal.jpg";
import currency from "../../../assets/currency.jpg";
import editBudget from "../../../assets/EditBudget.jpg";
import login from "../../../assets/login.jpg";
import transaction from "../../../assets/transaction.jpg";


export default function Carousel() {
    const images = [reg, balance, budget,budgetModal,currency,editBudget,login,transaction];
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => {
            const i = Math.round(el.scrollLeft / el.clientWidth);
            setIndex(i);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    const goTo = (i) => {
        const el = trackRef.current;
        if (!el) return;
        const clamped = Math.max(0, Math.min(i, images.length - 1));
        el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    };

    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);

    return (
        <div className="mt-12 flex flex-col items-center space-y-6">
            <Link
                to="/about"
                className="text-emerald-700 hover:underline underline-offset-4 font-medium"
            >
                Learn more about FinTrack →
            </Link>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
                <div className="relative w-full md:w-2/3 max-w-md aspect-square rounded-2xl overflow-hidden bg-white shadow">
                    <div
                        ref={trackRef}
                        className="h-full w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none]"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {images.map((src, i) => (
                            <div key={i} className="snap-start shrink-0 w-full h-full">
                                <img
                                    src={src}
                                    alt={`slide-${i}`}
                                    loading="lazy"
                                    className="h-full w-full object-contain bg-neutral-100 outline outline-1 outline-neutral-300"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow text-neutral-700 hover:bg-white transition"
                        disabled={index === 0}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow text-neutral-700 hover:bg-white transition"
                        disabled={index === images.length - 1}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 w-2 rounded-full transition ${
                                    i === index
                                        ? "bg-neutral-800"
                                        : "bg-neutral-300 hover:bg-neutral-500"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="absolute right-170 top-1/2 -translate-y-1/2 ">
                    <Link
                        to="/login"
                        className="text-emerald-700 hover:underline underline-offset-4 font-medium"
                    >
                        Get started →
                    </Link>
                </div>

            </div>
            <div className="md:hidden">
                <Link
                    to="/login"
                    className="text-emerald-700 hover:underline underline-offset-4 font-medium"
                >
                   Get started →
                </Link>
            </div>
        </div>

    );
}
