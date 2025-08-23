'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se usuário está logado
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin', email: 'admin@erp.com' })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simular login
      if (email === 'admin@erp.com' && password === 'admin123') {
        const userData = { name: 'Administrador', email, role: 'admin' }
        setUser(userData)
        localStorage.setItem('token', 'demo-token-123')
        return { success: true }
      }
      return { success: false, error: 'Credenciais inválidas' }
    } catch (error) {
      return { success: false, error: 'Erro no login' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}