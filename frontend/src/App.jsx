import { AuthPage } from './pages/AuthPage';
import { CounterPage } from './pages/CounterPage';
import { Routes, Route } from 'react-router'; 

import './App.css';

function App() {

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/counter" element={<CounterPage />} />
        </Routes>
    );

}

export default App
