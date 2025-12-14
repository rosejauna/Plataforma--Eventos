import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token && !user) {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) setUser(stored);
    }
  }, []);

  // LOGIN --------------------------------
  async function login(email, senha) {
    try {
      const { data } = await api.post("/auth/login", { email, senha });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      navigate("/");
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.erro || "Erro ao realizar login",
      };
    }
  }

  // REGISTRO --------------------------------
  async function register(payload) {
    try {
      const { data } = await api.post("/auth/registrar", payload);
      return data;
    } catch (err) {
      return { erro: err.response?.data?.erro || "Erro ao registrar usuário" };
    }
  }

  // ⭐ ATUALIZAR USUÁRIO (IMPORTANTE PARA SALVAR FOTO)
  function updateUser(updated) {
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  }

  // LOGOUT --------------------------------
  function logout() {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateUser, // ⭐ agora exportado corretamente
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
