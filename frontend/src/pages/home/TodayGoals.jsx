import { useState, useEffect } from 'react';
import { api } from '../../api/client';
import './TodayGoals.css';

export function TodayGoals({ onGoalChange }) {

    const [goals, setGoals] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const saveDescription = (event) => {
        setDescription(event.target.value)
    }

    const addGoal = async () => {
        try {
            await api.post('/goals', {
                description: description
            });
            setError("");
            onGoalChange();
            await fetchGoals();
        } catch (error) {
            setError("Failed to create goal");
        }
    }

    const fetchGoals = async () => {
        try {
            const response = await api.get('/goals');
            setGoals(response.data);
            setError("");
        } catch (error) {
            setError("Failed to retrieve goals");
        }
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    const toggleCompleted = async (goal) => {
        try {
            const response = await api.put(`/goals/${goal.id}`, {
                description: goal.description,
                completed: !goal.completed,
            });
            setGoals((currentGoals) =>
                currentGoals.map((item) => (item.id === goal.id ? response.data : item))
            );
            onGoalChange();
            setError("");
        } catch (error) {
            const detail = error.response?.data?.detail;
            let message = "Something went wrong trying to update the goal";

            if (typeof detail === "string") {
                message = detail;
            } else if (Array.isArray(detail) && detail[0]?.msg) {
                message = detail[0].msg;
            }
            setError(message);
        }
    };

    const deleteGoal = async (goal) => {
        try {
            await api.delete(`/goals/${goal.id}`);
            setError("");
            onGoalChange();
            await fetchGoals();
        } catch (error) {
            const detail = error.response?.data?.detail;
            let message = "Something went wrong trying to delete the goal";
            if (typeof detail === "string") {
                message = detail;
            } else if (Array.isArray(detail) && detail[0]?.msg) {
                message = detail[0].msg;
            }
            setError(message);
        }
    }

    return (
        <div className="today-goals-list">
            <h2>Today's Goals</h2>

            {error && <p className="goals-error">{error}</p>}

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

            <div className="task-input-container">
                <input 
                    placeholder="Add a Goal" 
                    size="30"
                    onChange={saveDescription}
                    value={description}
                    className="task-input"
                />
                <button 
                    onClick={addGoal}
                    className="send-button"
                >Add Goal</button>


        </div>

        </div>
    );

}
