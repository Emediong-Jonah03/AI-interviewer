import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";
import type { User } from "../types/user";
import { AuthContext, type AuthContextType } from "./AuthContextComponent";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // INITIAL CHECK
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("access");

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Failed to parse stored user", err);
                localStorage.removeItem("user");
                localStorage.removeItem("access");
            }
        }
        setIsLoading(false);
    }, []);

    // LOGIN
    const login = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            const res = await api.post("/v1/auth/login", {
                email,
                password,
            });

            const userData: User = res.data.user;
            const accessToken = res.data.tokens?.access || res.data.accessToken;

            if (!accessToken) {
                console.error("Login response missing access token:", res.data);
                throw new Error("Invalid server response: Missing access token");
            }

            localStorage.setItem("access", accessToken);
            localStorage.setItem("user", JSON.stringify(userData));

            setUser(userData);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            if (err.response?.data?.error) {
                throw new Error(err.response.data.error);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // SIGNUP
    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<string> => {
        setIsLoading(true);

        try {
            const res = await api.post("/v1/auth/register", {
                name,
                email,
                password,
            });

            return (
                res.data.message ||
                "Account created successfully. Please sign in."
            );
        } catch (error: unknown) {
            const err = error as { response?: { data?: string | Record<string, unknown> } };
            if (err.response?.data) {
                throw err.response.data;
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // LOGOUT
    const logout = async () => {
        try {
            await api.post("/v1/auth/logout");
        } catch {
            // backend failure shouldn't block logout
        } finally {
            localStorage.clear();
            setUser(null);
            window.location.href = "/login";
        }
    };

    // DELETE ACCOUNT
    const deleteAccount = async () => {
        await api.delete("/v1/auth/delete-account/");
        localStorage.clear();
        setUser(null);
        window.location.href = "/signup";
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        deleteAccount,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};