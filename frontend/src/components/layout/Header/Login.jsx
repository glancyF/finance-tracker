import loginIcon from "../../../assets/log-in.svg";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <Link
            to="/login"
            className="
        flex items-center gap-2 rounded-md px-2 py-1
        text-neutral-700 dark:text-neutral-200
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        transition-colors
        select-none
      "
            aria-label="Sign in"
        >
            <img src={loginIcon} alt="" className="h-6 w-6" />
            <span className="hidden sm:inline text-sm font-medium">Sign in</span>
        </Link>
    );
}
