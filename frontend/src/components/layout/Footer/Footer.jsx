export default function Footer() {
    return (
        <footer
            className="
        mt-12
        border-t border-[#F0F0F0]
        bg-white/80
        backdrop-blur-xl supports-[backdrop-filter]:bg-white/60
      "
        >
            <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} FinTrack. All rights reserved.
            </div>
        </footer>
    );
}
