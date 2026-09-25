import { useState, useEffect } from 'react';
import axios from 'axios';

export function AddTaskPage() {

    const [description, setDescription] = useState("");

    const saveDescription = (event) => {
        setDescription(event.target.value)
    }

    const addTask = async () => {
        const response = await axios.post('/api/goals', {
            description: description
        });
    }

    return (
        <div className="task-input-container">
                <input 
                    placeholder="Add a Task" 
                    size="30"
                    onChange={saveDescription}
                    value={description}
                    className="task-input"
                />
                <button 
                    onClick={addTask}
                    className="send-button"
                >Add Task</button>


        </div>
    ) // add a list of the current goals

}