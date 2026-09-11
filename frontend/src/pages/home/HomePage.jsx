import axios from 'axios';
import { useState, useEffect } from 'react';
import { Grid } from "./Grid";

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
        <div>
            <button>Add Task</button>
            <Grid compoundScores={compoundScores}/>
        </div>
    );

}