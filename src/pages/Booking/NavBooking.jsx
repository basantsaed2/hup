import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBooking = () => {
  return (
    <div>
      <nav className=" flex justify-evenly  p-0 md:grid md:grid-cols-3 gap-6 md:p-5">
      <NavLink 
  to="/Booking" 
  end
  className={({ isActive }) => 
    `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
    ${isActive ? 'border-b-1 border-b-three' : ''}`
  }
>
 History

        </NavLink>
        <NavLink 
          to="/Booking/CurrentBookings"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
           pending  
        </NavLink>
  
        <NavLink 
          to="/Booking/CanceledBooking"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Canceled    
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBooking;