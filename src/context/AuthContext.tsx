import { onAuthStateChanged, type User } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { firebaseAuth } from "../services/firebase"
import { signInWithEmail, signUpWithEmail, signOutUser } from "../services/authService"

type AuthContextType = {
  user: User | null
  isAuthReady: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser)
      setIsAuthReady(true)
    })

    return () => unsub()
  }, [])

  const signUp = async (email: string, password: string) => {
    const cred = await signUpWithEmail(email, password);
    setUser(cred.user);
  }

  const signIn = async (email: string, password: string) => {
    const cred = await signInWithEmail(email, password);    
    setUser(cred.user);
  }

  const signOut = async () => {
    await signOutUser();
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isAuthReady,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export { AuthContext, AuthProvider }