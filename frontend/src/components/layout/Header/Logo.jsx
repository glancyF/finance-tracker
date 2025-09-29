import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 select-none"
            aria-label="Home"
        >
            <img
                src={logo}
                alt="FinTrack logo"
                className="h-7 w-7"
            />
            <span className="text-lg font-semibold tracking-wide uppercase text-neutral-900 dark:black-neutral-100">
        FinTrack
      </span>
        </Link>
    );
}
