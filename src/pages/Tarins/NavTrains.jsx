import React from 'react'
import { NavLink } from 'react-router-dom';

const NavTrains = () => {
  return (
    <div>
      <nav className=" flex justify-evenly  p-0 md:grid md:grid-cols-4 gap-6 md:p-5">
      <NavLink 
to="/Train" 
end
className={({ isActive }) => 
  `text-center py-3 px-1 md:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
  ${isActive ? 'border-b-1 border-b-three' : ''}`
}
>
Type    
      </NavLink>
      <NavLink 
        to="/Train/TrainClass"
        className={({ isActive }) => 
          `text-center py-3  px-1 md:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
          ${isActive ? 'border-b-1 border-b-three' : ''}`
        }
      >
        Class
      </NavLink>
      <NavLink 
        to="/Train/TrainRoute"
        className={({ isActive }) => 
          `text-center py-3 px-1 md:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
          ${isActive ? 'border-b-1 border-b-three' : ''}`
        }
      >

        Route
      </NavLink>
      <NavLink 
        to="/Train/Trains"
        className={({ isActive }) => 
          `text-center py-3 px-1 md:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
          ${isActive ? 'border-b-1 border-b-three' : ''}`
        }
      >

Tarins   
   </NavLink>
    </nav>
  </div>
  )
}

export default NavTrains
