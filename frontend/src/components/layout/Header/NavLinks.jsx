import { Link } from "react-router-dom";
export default function NavLinks(){
    return (
        <nav className="flex items-center gap-x-6">
            <Link to="/about" className="uppercase font-semibold hover:underline underline-offset-4">About</Link>
            <Link to="/contact" className="uppercase font-semibold hover:underline underline-offset-4">Contact</Link>

        </nav>
    );
}