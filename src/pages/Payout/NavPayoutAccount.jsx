
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavPayoutAccount= () => {
    return (
        <div>
          <nav className="grid grid-cols-3 gap-6 p-5">
          <NavLink 
      to="/Allpayot" 
      end
      className={({ isActive }) => 
        `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
        ${isActive ? 'border-b-1 border-b-three' : ''}`
      }
    >
     History
    
            </NavLink>
            <NavLink 
            
              to="/PayoutAccount"
              className={({ isActive }) => 
                `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
                ${isActive ? 'border-b-1 border-b-three' : ''}`
              }
            >
               pending  
            </NavLink>
      
            <NavLink 
              to="/Cancelpayout"
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
    

export default NavPayoutAccount;