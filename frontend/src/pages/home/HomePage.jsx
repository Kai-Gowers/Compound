import axios from 'axios';
import { useState, useEffect } from 'react';
import { Grid } from "./Grid";
import { TodayGoals } from "./TodayGoals";
import { useNavigate } from "react-router-dom";

import './HomePage.css';

export function HomePage() {

    const [compoundScores, setCompoundScores] = useState([]);

    const getScores = async () => {
        const response = await axios.get('/api/scores');
        setCompoundScores(response.data);
    }

    useEffect(() => {
        getScores();
    }, []);

    const navigate = useNavigate();

    const goToAddTask = () => {
        navigate("/addtask");
    }

    return (
        <main className="home-page">
            <header className="home-header">
                <div>
                    <p className="home-eyebrow">Your progress</p>
                    <h1>Daily compounds</h1>
                </div>
                <button 
                    type="button"
                    onClick={goToAddTask}
                >
                    Add Task
                </button>
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