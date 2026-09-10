import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? "/login" : "/signup";

        await axios.post(
            `/api/auth${endpoint}`,
            { email, password },
            { withCredentials: true}
        );

        if (isLogin) {
            navigate("/counter");
        }

    };
    

    return (
        <div>
            <h1>{isLogin ? "Login": "Sign Up"}</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                </button>

            </form>

            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create an account" : "Already have an account?"}
            </button>

        </div>
    );

}