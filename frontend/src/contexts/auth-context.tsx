'use client'

import { apiFetchMe, apiSignIn, type AuthUser } from '@/lib/auth-api'
import {
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from '@/lib/auth-storage'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isReady: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = getStoredAccessToken()
    if (!stored) {
      setIsReady(true)
      return
    }

    setToken(stored)
    apiFetchMe(stored)
      .then(setUser)
      .catch(() => {
        clearStoredAccessToken()
        setToken(null)
        setUser(null)
      })
      .finally(() => {
        setIsReady(true)
      })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { accessToken } = await apiSignIn(email, password)
    setStoredAccessToken(accessToken)
    setToken(accessToken)
    const me = await apiFetchMe(accessToken)
    setUser(me)
  }, [])

  const logout = useCallback(() => {
    clearStoredAccessToken()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isReady,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
    }),
    [user, token, isReady, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
