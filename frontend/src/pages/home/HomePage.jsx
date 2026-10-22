import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/AuthProvider";
import { Grid } from "./Grid";
import { TodayGoals } from "./TodayGoals";
import { DateGoalHistory } from './DateGoalHistory';
import { HomeHeader } from './HomeHeader';
import { currentYearRange, listOfYears } from '../../utils/dates';

import { api } from "../../api/client";

import './HomePage.css';

export function HomePage() {

    const [start, end] = currentYearRange();

    const { user, setUser } = useAuth();
    const [compoundScores, setCompoundScores] = useState([]);
    const [error, setError] = useState("");
    const [period, setPeriod] = useState([start, end]);
    const [selectedDate, setSelectedDate] = useState(null);

    const years = listOfYears(Number(user.sign_up_date.slice(0, 4))); 

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

    const putYears = async (year) => {
        setPeriod([`${year}-01-01`, `${year}-12-31`]);
    }

    const logOut = async () => {
        try {
            const response = await api.post('/auth/logout');
            setUser(null);
            navigate("/");
        } catch (error) {
            setError("Error - Failed to Log Out");
        }
    }

    const selectDate = (date) => {
        if (date === selectedDate) {
            setSelectedDate(null);
        } else {
            setSelectedDate(date);
        }
    }

    useEffect(() => {
        getScores();
    }, [period]);

    return (
        <main className="home-page">

            <HomeHeader onLogout={logOut}/>

            {error && <p className="score-error">{error}</p>}

            <section className="progress-card">
                <div className="progress-card-body">
                    <div className="progress-graph">
                        <Grid compoundScores={compoundScores} onSelectDate={selectDate} />
                    </div>
                    <ul className="year-tabs">
                        {years.map((year) => {
                            const selected =
                                period[0] === `${year}-01-01` &&
                                period[1] === `${year}-12-31`;

                            return (
                                <li key={year}>
                                    <button
                                        type="button"
                                        className={`year-tab${selected ? " year-tab--selected" : ""}`}
                                        aria-current={selected ? "true" : undefined}
                                        onClick={() => putYears(year)}
                                    >
                                        {year}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <div className="goals-row">
                <section className="today-goals">
                    <TodayGoals onGoalChange={getScores}/>
                </section>
                {selectedDate && (
                    <aside className="date-history-slot">
                        <DateGoalHistory date={selectedDate}/>
                    </aside>
                )}
            </div>
        </main>
    );

}