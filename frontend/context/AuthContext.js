"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/chat")
      .then(() => {
        const s = localStorage.getItem("user");
        if (s) setUser(JSON.parse(s));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
