
import './HomeHeader.css';

export function HomeHeader({ onLogout }) {

    return (
        <header className="home-header">
            <div>
                <p className="home-eyebrow">Your progress</p>
                <h1>Daily compounds</h1>
            </div>

            <button 
                className="log-out"
                onClick={onLogout}
            >
                Log Out
            </button>

        </header>
    );

}