import { Routes, Route } from 'react-router'; 
import { AuthPage } from './pages/AuthPage';
import { CounterPage } from './pages/CounterPage';
import { HomePage } from './pages/home/HomePage';

import './App.css';

function App() {

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );

}

export default App
