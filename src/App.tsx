import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { ChatsPage } from './pages/chat/ChatsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        // Chat route
        <Route path="/chats" element={<ChatsPage />} />

        // Default route
        <Route path="*" element={<Navigate to="/chats" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
