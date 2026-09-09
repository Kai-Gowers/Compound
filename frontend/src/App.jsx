import axios from 'axios';
import { useState, useEffect } from 'react'

import './App.css';


function App() {

    const [count, setCount] = useState(null);

    useEffect(() => {
        const getCounterValue = async () => {
            const response = await axios.get('api/counter');
            setCount(response.data.value);  
        }
        getCounterValue();
    }, [])

    async function incrementCount() {
        const response = await axios.post('api/counter/increment');
        setCount(response.data.value);
    }

    return (
        <div>
            <h1>Compound App</h1>

            <button className="increment-count" onClick={incrementCount}>Increment Count</button>

            <div>{count}</div>
        </div>
    )
}

export default App
