import { useState, useEffect } from 'react';
import axios from 'axios';

import './TodayGoals.css';

export function TodayGoals({ onGoalChange }) {

    const [goals, setGoals] = useState([]);

    const fetchGoals = async () => {
            const response = await axios.get('/api/goals');
            setGoals(response.data);
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    const toggleCompleted = async (goal) => {
        const response = await axios.put(`/api/goals/${goal.id}`, {
            description: goal.description,
            completed: !goal.completed,
        });
        setGoals((currentGoals) =>
            currentGoals.map((item) => (item.id === goal.id ? response.data : item))
        );
        onGoalChange();
    };

    const deleteGoal = async (goal) => {
        const response = await axios.delete(`/api/goals/${goal.id}`);
        fetchGoals();
        onGoalChange();
    }

    return (
        <div className="today-goals-list">
            <h2>Today's Goals</h2>
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <span>{goal.description}</span>
                        <button
                            type="button"
                            className={`goal-complete-button${goal.completed ? '' : ' goal-complete-button--incomplete'}`}
                            onClick={() => toggleCompleted(goal)}
                        >
                            {goal.completed ? '✓' : '✗'}
                        </button>
                        <button
                            type="button"
                            className="deleteGoal"
                            onClick={() => deleteGoal(goal)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
