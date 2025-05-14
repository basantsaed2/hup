import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBuses= () => {
  return (
    <div  >
      <nav className=" flex justify-evenly  md:grid md:grid-cols-3 gap-6 p-5">
      <NavLink 
  to="/Buses" 
  end
  className={({ isActive }) => 
    `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
    ${isActive ? 'border-b-1 border-b-three' : ''}`
  }
>
Buses
        </NavLink>
        <NavLink 
          to="/Buses/TypeBuses"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Type Buses
        </NavLink>
        <NavLink 
          to="/Buses/Aminites"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
Aminites
        </NavLink>
   
      </nav>
    </div>
  );
};

export default NavBuses;