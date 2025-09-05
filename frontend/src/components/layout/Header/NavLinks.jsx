import { Link } from "react-router-dom";
export default function About(){
    return (
        <nav className="flex items-center gap-x-6">
            <Link
            to="/about"
            className="uppercase font-semibold hover:underline underline-offset-4"
            />
            
            <a
                href="/contact"
                className="uppercase font-semibold hover:underline underline-offset-4"
            >
                Contact
            </a>
        </nav>
    )
}