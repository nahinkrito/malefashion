import { createContext, useContext, useState, useEffect } from 'react'
import { users } from '../data/users'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsAuthenticated(true)
      setIsAdmin(user.role === 'admin')
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API request delay
      setTimeout(() => {
        const user = users.find(
          user => user.email === email && user.password === password
        )
        
        if (user) {
          // Don't store the password in local storage (security best practice)
          const { password, ...userWithoutPassword } = user
          setCurrentUser(userWithoutPassword)
          setIsAuthenticated(true)
          setIsAdmin(user.role === 'admin')
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800)
    })
  }

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API request delay
      setTimeout(() => {
        // Check if email already exists
        const existingUser = users.find(user => user.email === userData.email)
        if (existingUser) {
          reject(new Error('Email already in use'))
          return
        }
        
        // Create new user
        const newUser = {
          id: `user-${users.length + 1}`,
          ...userData,
          role: 'customer',
          createdAt: new Date().toISOString(),
        }
        
        // Don't store the password in local storage (security best practice)
        const { password, ...userWithoutPassword } = newUser
        
        // In a real app, we would add the user to the database
        // Here we're just setting the current user
        setCurrentUser(userWithoutPassword)
        setIsAuthenticated(true)
        setIsAdmin(false)
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
        
        resolve(userWithoutPassword)
      }, 800)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem('currentUser')
  }

  const updateProfile = (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...currentUser, ...updatedData }
        setCurrentUser(updatedUser)
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        resolve(updatedUser)
      }, 800)
    })
  }

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}