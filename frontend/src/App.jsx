import { Routes, Route, Navigate } from 'react-router'; 
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './auth/AuthProvider';
import { HomePage } from './pages/home/HomePage';

import './App.css';

function App() {

    const { user } = useAuth();

    if (user === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <Routes>
            <Route 
                path="/" 
                element={user ? <Navigate to="/home" replace /> : <AuthPage />} 
            />
            <Route 
                path="/home" 
                element={user ? <HomePage /> : <Navigate to="/" replace />} 
            />
        </Routes>
    );

}

export default App
