import React, { useEffect, useState } from 'react';
import SignupButtonContainer from '../assets/SignupButtonContainer.svg';
import Loginpic from '../assets/Loginpic.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginIn({ setIsLoggedIn }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  navigate('/login', { replace: true, state: location.state });
},[location.state, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

    const handleLogin = () => {
    setLoading(true);
    // localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    axios
      .post('https://bcknd.ticket-hub.net/api/login', { 
        email: username, 
        password: password
      })
      .then((response) => {
        setData(response.data);
        if (response.data.message === "Login Successfully") {
          localStorage.setItem('token', response.data.token);
          toast.success(`welcome`);

          setTimeout(() => {
            setIsLoggedIn(true);  
          }, 2000);

        } else {
          toast.error(' write email or password right');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        toast.error(' Connection failed ');
      });
  };


  return (
    <div className='w-screen h-screen grid md:grid-cols-2 gap-2'>
      <div className='flex justify-between items-start'>
        <div className='flex flex-col mt-[5%] ml-[8%]'>
          <span className='text-2xl lg:text-5xl text-one font-medium'>Login</span> 
          <span className='text-[24px] lg:text-[50px] pt-5 lg:pt-10'>Welcome back</span>
          <span className='text-[16px] lg:text-[24px] mt-1'>Log in to your account</span>

          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full h-[56px] my-3 lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3'
            placeholder='email'
          />

          <div className='relative'>
          
<input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-[72px] border border-one rounded-[8px] pl-3 pr-12"
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 focus:outline-none"
      >
        {/* {showPassword ? (
          <FiEyeOff size={24} />
        ) : (
          <FiEye size={24} />
        )} */}
      </button>
</div>

          <button className=' bg-one mt-5 w-full h-[72px] border border-one rounded-[8px] relative overflow-hidden ' onClick={handleLogin}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > Login</span>
               <span className='absolute w-20 h-20 right-55 lg:right-75 z-2 bg-three top-0 transform transition rotate-45'></span>
               <span className='absolute w-25 h-25 right-50 lg:right-70 bg-white top-0 transform transition rotate-30'></span>


            {/* <img src={SignupButtonContainer} className='w-[400px] h-[56px] my-3 lg:h-[72px]   rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95' /> */}
          </button>
        </div>
      </div>

      <div className='hidden md:flex'>
        <img src={Loginpic} className='object-fill w-full h-screen max-h-[800px]' />
      </div>
            <ToastContainer />
      
    </div>
  );
}

export default LoginIn;
