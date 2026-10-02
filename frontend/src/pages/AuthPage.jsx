import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

import { api } from "../api/client";

import './AuthPage.css';

export function AuthPage() {

    const { setUser } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        const endpoint = isLogin ? "/login" : "/signup";

        try {

            await api.post(
                `/auth${endpoint}`,
                { email, password }
            );
            
            if (!isLogin) {
                await api.post(
                    `/auth/login`,
                    { email, password }
                );
            }
            
            const me  = await api.get("/auth/me");
            setUser(me.data);
            navigate("/home");
            

        } catch (error) {
            const detail = error.response?.data?.detail;
            let message = "Something went wrong";

            if (typeof detail === "string") {
                message = detail;
            } else if (Array.isArray(detail) && detail[0]?.msg) {
                message = detail[0].msg;
            }
            setError(message);
        }


    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <p className="auth-eyebrow">Compound</p>
                <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>
                <p className="auth-description">
                    {isLogin
                        ? "Sign in to continue tracking your progress."
                        : "Start building consistent progress, one day at a time."}
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <button
                    className="auth-toggle"
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Create an account" : "Already have an account?"}
                </button>
            </section>
        </main>
    );

}