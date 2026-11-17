import { NavLink } from 'react-router-dom';
import "./Footer.css";

export function Footer() {
    return (
        <nav className="app-footer">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/search">Search</NavLink>
        </nav>
    );
}