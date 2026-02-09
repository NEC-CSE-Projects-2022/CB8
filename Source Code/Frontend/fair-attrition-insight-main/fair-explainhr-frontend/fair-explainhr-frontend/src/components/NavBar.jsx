import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {

  const linkClass = ({ isActive }) =>
    isActive ? 'active-link nav-link' : 'nav-link'

  return (
    <>
      <style>
        {`
          /* Navbar background */
          header {
            background-color: #101010; 
          }

          /* Base link styling */
          .nav-link {
            color: white !important;
            font-weight: bold;
            margin: 0 12px;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }

          /* Hover effect */
          .nav-link:hover {
            color: red !important;
          }

          /* Active link styling */
          .active-link {
            color: #11e8e5ff !important;
            font-weight: bold;
          }
        `}
      </style>

      <header className="sticky top-0 z-30 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            
            {/* 🔵 REPLACED FE CIRCLE WITH IMAGE */}
            <img
              src="/logo2.jpg"     /* <-- put your image in public/logo.png */
              alt="Logo"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex flex-col leading-tight">
              <div className="text-lg font-bold text-white">Employee Attrition</div>
              <div className="text-xs text-white">Ethical Attrition Insights</div>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink to="/" className={linkClass}>HOME</NavLink>
            <NavLink to="/validation" className={linkClass}>VALIDATION</NavLink>
            <NavLink to="/about" className={linkClass}>ABOUT US</NavLink>
            <NavLink to="/Explainability" className={linkClass}></NavLink>
          </nav>

        </div>
      </header>
    </>
  )
}
