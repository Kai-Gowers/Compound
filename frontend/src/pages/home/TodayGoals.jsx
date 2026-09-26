import { useState, useEffect } from 'react';
import { api } from '../../api/client';
import './TodayGoals.css';

export function TodayGoals({ onGoalChange }) {

    const [goals, setGoals] = useState([]);
    const [description, setDescription] = useState("");

    const saveDescription = (event) => {
        setDescription(event.target.value)
    }

    const addGoal = async () => {
        await api.post('/goals', {
            description: description
        });
        onGoalChange();
        fetchGoals();
    }

    const fetchGoals = async () => {
        const response = await api.get('/goals');
        setGoals(response.data);
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    const toggleCompleted = async (goal) => {
        const response = await api.put(`/goals/${goal.id}`, {
            description: goal.description,
            completed: !goal.completed,
        });
        setGoals((currentGoals) =>
            currentGoals.map((item) => (item.id === goal.id ? response.data : item))
        );
        onGoalChange();
    };

    const deleteGoal = async (goal) => {
        await api.delete(`/goals/${goal.id}`);
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
