import './DateGoalHistory.css';
import { useState, useEffect } from 'react';
import { api } from '../../api/client';

export function DateGoalHistory({ date }) {

    const [goals, setGoals] = useState([]);
    const [error, setError] = useState("");

    const fetchGoals = async (date) => {
        try {
            const response = await api.get(`/goals?date=${date}`);
            setGoals(response.data);
        } catch (error) {
            setError("Failed to retrieve goals");
        }
    }

    useEffect(() => {
        fetchGoals(date);
    }, [date])

    return (

        <div className="goal-list">

            <h1>
                {date}
            </h1>

            {goals.map((goal) => (
                <li key={goal.id}>
                    {goal.description + ": " + (goal.completed ? "completed" : "not completed")}
                </li>
            ))}

            {goals.length === 0 && <h3>no goals on this day</h3>}

        </div>

    );



}