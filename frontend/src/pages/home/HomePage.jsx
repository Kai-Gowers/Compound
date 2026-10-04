import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/AuthProvider";
import { Grid } from "./Grid";
import { TodayGoals } from "./TodayGoals";

import { api } from "../../api/client";

import './HomePage.css';

export function HomePage() {

    const now = new Date();
    const end = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");
    const start = [
        now.getFullYear() - 1,
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const { setUser } = useAuth();
    const [compoundScores, setCompoundScores] = useState([]);
    const [error, setError] = useState("");
    const [period, setPeriod] = useState([start, end]);

    const navigate = useNavigate();

    const getScores = async () => {
        try {
            const response = await api.get(`/scores?start_date=${period[0]}&end_date=${period[1]}`);
            setCompoundScores(response.data);
            setError("");
        } catch (error) {
            setError("Failed to retrieve scores");
        }
    }

    const logOut = async () => {
        const response = await api.post('/auth/logout');
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        getScores();
    }, []);

    return (
        <main className="home-page">
            <header className="home-header">
                <div>
                    <p className="home-eyebrow">Your progress</p>
                    <h1>Daily compounds</h1>
                </div>

                <button 
                    className="log-out"
                    onClick={logOut}
                >
                    Log Out
                </button>

            </header>

            {error && <p className="score-error">{error}</p>}

            <section className="progress-card">
                <Grid compoundScores={compoundScores}/>
            </section>

            <section className="today-goals">
                <TodayGoals onGoalChange={getScores}/>
            </section>

        </main>
    );

}