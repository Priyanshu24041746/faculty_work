import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/login"
import IT from "./pages/it"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/it" element={<IT />} />
      </Routes>
    </Router>
  )
}

export default App
