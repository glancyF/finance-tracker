import { Link } from "react-router-dom";

export default function NavLinks() {
    return (
        <nav className="flex items-center gap-6">
            <Link
                to="/about"
                className="
          px-2 py-1
          text-sm tracking-wide uppercase font-medium
          text-[#1A1A1A]
          hover:text-black
          hover:bg-[#F7F7F7]/80
          rounded-md
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-[#EAEAEA]
        "
            >
                About
            </Link>
            <Link
                to="/contact"
                className="
          px-2 py-1
          text-sm tracking-wide uppercase font-medium
          text-[#1A1A1A]
          hover:text-black
          hover:bg-[#F7F7F7]/80
          rounded-md
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-[#EAEAEA]
        "
            >
                Contact
            </Link>
        </nav>
    );
}
