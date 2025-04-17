import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLocation = () => {
  return (
    <div>
      <nav className=" flex justify-evenly md:grid md:grid-cols-4 gap-6 p-5">
      <NavLink 
  to="/Location" 
  end
  className={({ isActive }) => 
    `text-center py-3 px-0 lg:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
    ${isActive ? 'border-b-1 border-b-three' : ''}`
  }
>
Countries
        </NavLink>
        <NavLink 
          to="/Location/Cities"
          className={({ isActive }) => 
            `text-center py-3 px-0 lg:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Cities
        </NavLink>
        <NavLink 
          to="/Location/Zones"
          className={({ isActive }) => 
            `text-center py-3 px-0 lg:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Zones
        </NavLink>
        <NavLink 
          to="/Location/Stations"
          className={({ isActive }) => 
            `text-center py-3 px-0 lg:px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Stations   
        </NavLink>
      </nav>
    </div>
  );
};

export default NavLocation;