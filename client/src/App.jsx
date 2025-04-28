import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Clubs } from './pages/Clubs'
import { Events } from './pages/Events'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Club" element={<Clubs />} />
        <Route path="/Event" element={<Events />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
