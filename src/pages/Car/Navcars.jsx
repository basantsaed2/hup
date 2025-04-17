import React from 'react'
import { NavLink } from 'react-router-dom';

const Navcars = () => {
  return (
      <div>
         <nav className=" flex   justify-evenly  md:grid md:grid-cols-4 gap-2 md:gap-6 p-5">
         <NavLink 
     to="/Car" 
     end
     className={({ isActive }) => 
       `text-center py-3 px-1 text-gray-800 font-semibold border border-transparent transition-colors 
       ${isActive ? 'border-b-1 border-b-three' : ''}`
     }
   >
   Caetogries
           </NavLink>
           <NavLink 
             to="/Car/BRANDS"
             className={({ isActive }) => 
               `text-center py-3 px-1 text-gray-800 font-semibold border border-transparent transition-colors 
               ${isActive ? 'border-b-1 border-b-three' : ''}`
             }
           >
             BRANDS
           </NavLink>
           <NavLink 
             to="/Car/MODELS"
             className={({ isActive }) => 
               `text-center py-3 px-1 text-gray-800 font-semibold border border-transparent transition-colors 
               ${isActive ? 'border-b-1 border-b-three' : ''}`
             }
           >
             MODELS
           </NavLink>
           <NavLink 
             to="/Car/CARS"
             className={({ isActive }) => 
               `text-center py-3 px-1 text-gray-800 font-semibold border border-transparent transition-colors 
               ${isActive ? 'border-b-1 border-b-three' : ''}`
             }
           >
             CARS   
           </NavLink>
         </nav>
       </div>
  )
}

export default Navcars
