import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Club } from './pages/Club'
import { Event } from './pages/Event'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Club" element={<Club />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
