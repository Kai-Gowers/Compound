import axios from 'axios';
import { useState, useEffect } from 'react';
import { Grid } from "./Grid";

import './HomePage.css';

export function HomePage() {

    const [compoundScores, setCompoundScores] = useState([]);

    useEffect(() => {
        const getScores = async () => {
            const response = await axios.get('/api/scores');
            setCompoundScores(response.data);
        }
        getScores();
    }, []);

    return (
        <main className="home-page">
            <header className="home-header">
                <div>
                    <p className="home-eyebrow">Your progress</p>
                    <h1>Daily compounds</h1>
                </div>
                <button type="button">Add Task</button>
            </header>

            <section className="progress-card">
                <Grid compoundScores={compoundScores}/>
            </section>
        </main>
    );

}