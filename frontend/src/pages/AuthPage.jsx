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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? "/login" : "/signup";

        await api.post(
            `/auth${endpoint}`,
            { email, password }
        );

        if (isLogin) {
            const me  = await api.get("/auth/me");
            setUser(me.data);
            navigate("/home");
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