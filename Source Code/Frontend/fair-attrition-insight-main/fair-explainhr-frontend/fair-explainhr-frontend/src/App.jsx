import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Validation from './pages/Validation'
import Explainability from './pages/Explainability'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/validation" element={<Validation/>} />
          <Route path="/Explainability" element={<Explainability/>} />
        </Routes>
      </main>
      <footer className="bg-gray-700 text-gray-200 text-center py-6 rounded-xl shadow-lg mt-10 text-sm">
  © {new Date().getFullYear()}{" "}
  <span className="font-semibold text-white">
    Department of CSE
  </span>, Narasaraopeta Engineering College (Autonomous),  
  Narasaraopet, Andhra Pradesh – 522601, India
</footer>
    </div>
  )
}
