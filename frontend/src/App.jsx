import { Routes, Route, Navigate, Outlet } from 'react-router'; 
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './auth/AuthProvider';
import { HomePage } from './pages/home/HomePage';
import { SearchPage } from './pages/search/SearchPage';
import { Footer } from './components/Footer';

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
                element={user ? <AppLayout /> : <Navigate to="/" replace />}
            >
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
            </Route>
        </Routes>
    );

}

export default App

function AppLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}