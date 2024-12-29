import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from '../pages/auth/Register.jsx'
import Login from '../pages/auth/Login.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
