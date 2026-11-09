import { useNavigate } from 'react-router-dom';
import "./Footer.css";

export function Footer() {

    const navigate = useNavigate();

    return (
        <nav>
            <button 
                className="homebutton"
                onClick={() => navigate("/home")}
            >
                Home
            </button>
            <button 
                className="searchbutton"
                onClick={() => navigate("/search")}
            >
                Search
            </button>
        </nav>
    );

}