import { Routes, Route } from 'react-router'; 
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/home/HomePage';
import { AddTaskPage } from './pages/addTask/AddTaskPage';

import './App.css';

function App() {

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
        </Routes>
    );

}

export default App
