import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

export default function CustomNavlink({ to, children }) {
    const navlinkClass = "d-flex align-items-center gap-2 p-2 rounded transition duration-300";

    return (
        <li className="nav-item">
            <NavLink 
                to={to}
                className={({ isActive }) => 
                    isActive 
                        ? `${navlinkClass} bg-primary text-white` // Active state with Bootstrap classes
                        : `${navlinkClass} text-secondary` // Inactive state with Bootstrap classes
                }
            >
                {children}
            </NavLink>
        </li>
    );
}
