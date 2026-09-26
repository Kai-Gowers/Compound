import { useState, useEffect } from 'react';
import { Grid } from "./Grid";
import { TodayGoals } from "./TodayGoals";

import { api } from "../../api/client";

import './HomePage.css';

export function HomePage() {

    const [compoundScores, setCompoundScores] = useState([]);

    const getScores = async () => {
        const response = await api.get('/scores');
        setCompoundScores(response.data);
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
            </header>

            <section className="progress-card">
                <Grid compoundScores={compoundScores}/>
            </section>

            <section className="today-goals">
                <TodayGoals onGoalChange={getScores}/>
            </section>

        </main>
    );

}