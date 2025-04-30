import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Clubs } from "./pages/Clubs";
import { Events } from "./pages/Events";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { ClubProfile } from "./pages/ClubProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Clubs" element={<Clubs />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ClubProfile" element={<ClubProfile />} />
      </Routes>
    </>
  );
}

export default App;
