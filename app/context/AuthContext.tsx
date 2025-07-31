"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string 
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  forgotPassword: (email: string) => Promise<{ success: boolean, error?: string }>
  resetPassword: (token: string, password: string) => Promise<string>
  callAdminApi: () => Promise<{ success: boolean, message?: string }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])


  // Login function to authenticate user
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Login failed")

      const loggedUser = { id: data.userId, email, name: data.fullName , role: data.role}
      setUser(loggedUser)
      localStorage.setItem("user", JSON.stringify(loggedUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Register function to create a new user
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName: name }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Registration failed")

      const newUser = { id: data.userId, email, name, role: data.role }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }
  // Forgot password function to send reset link
  const forgotPassword = async (email: string): Promise<{ success: boolean, error?: string }> => {
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Forgot password failed")

      return { success: true }
    } catch (error: any) {
      console.error("Forgot Password error:", error)
      return { success: false, error: error.message }
    }
  }

  // Logout function to clear user session
  const logout = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })

      if (!res.ok) throw new Error("Logout failed")

      setUser(null)
      localStorage.removeItem("user")
      return true
    } catch (error) {
      console.error("Logout error:", error)
      return false
    }
  }

  // Reset password function to update user's password
  const resetPassword = async (token: string, password: string) => {
    try {
      const res = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()
      return data.message || 'Something went wrong'
    } catch (error) {
      return 'Error resetting password'
    }
  }

  
 
  // Example of an admin-only API call
  const callAdminApi = async (): Promise<{ success: boolean, message?: string }> => {
  try {
    const userData = localStorage.getItem("user")
    if (!userData) throw new Error("User not found")

    const parsedUser = JSON.parse(userData)

    const res = await fetch("/api/auth/adminonly", {
      method: "GET",
      headers: {
        Authorization: JSON.stringify(parsedUser)
      }
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || "Request failed")

    return { success: true, message: data.message }
  } catch (error: any) {
    console.error("Admin API error:", error)
    return { success: false, message: error.message }
  }
}


  return (
    <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, resetPassword,callAdminApi, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
