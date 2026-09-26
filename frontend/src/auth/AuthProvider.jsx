import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const loadMe = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch {
                setUser(null);
            }
        };
        loadMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return value;
}