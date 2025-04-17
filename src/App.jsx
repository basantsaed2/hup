import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import LoginIn from './Login/LoginIn.jsx';
import Togo from './foradmin/Togo.jsx';
import {  useEffect, useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] =useState(() => {
    const stored = sessionStorage.getItem('isLoggedIn');
    return stored === 'true'; // نحولها من string لـ boolean
  });
useEffect(() => {
  if(isLoggedIn){
    sessionStorage.setItem('isLoggedIn', 'true');
    }

  
}, [isLoggedIn]);
  return (
    
    <BrowserRouter>
        {isLoggedIn ? (
          <>
            <Togo   isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          </>
        ) : (
          <div className='flex overflow-hidden'>

          <Routes>
            <Route path='/' element={<LoginIn setIsLoggedIn={setIsLoggedIn} />} />
           
                <Route path='*' element={<LoginIn setIsLoggedIn={setIsLoggedIn} />} />

          </Routes>
          </div>
        )}
        
    </BrowserRouter>

  );
}

export default App;
