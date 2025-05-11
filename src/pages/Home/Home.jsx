import React, { useEffect } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";

const Home = ({ setIsLoggedIn, open, setopen }) => {
  const location = useLocation();
 
  const Handle = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('isLoggedIn', true)

    setIsLoggedIn(false);
  }

  const handleopen = () => {
      setopen(!open);

  }
// useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setopen(false);
//       } else {
//         setopen(true);
//       }
//     };
   
   
//     window.addEventListener('resize', handleResize);

//     // return () => {
//     //   window.removeEventListener('resize', handleResize);
//     // };
//   }, []);
  useEffect(() => {
    setopen(false); // إغلاق القائمة عند تغيير المسار

  },  [location.pathname]);
  
  return (
    <div>
      <div className='w-[95%] rounded-2xl p-10 mx-auto h-[56px] hidden lg:flex mt-6 px-[26px] justify-between bg-orange-400 '>
        <div className='flex justify-center items-center gap-3'>
          <img className='bg-two rounded-full w-[56px] h-[56px]' />
          <span className='font-medium text-[24px]'>Super Adimn</span>
        </div>
        <div className='flex justify-center items-center gap-3'>
    <button  onClick={Handle}>
    <BiLogOut className='w-8 text-one h-8'/>
      </button>     

          <i><CiBellOn className=' text-one h-8  w-8'/></i>
        </div>
      </div>
      {!open &&(

      <div className='flex  w-full   lg:hidden'>
        <button className=' h-15 px-5 flex items-center  w-[50%]' onClick={handleopen}>
          <FiAlignJustify  className='w-8 text-one h-8 text-right'/>
        </button>
        <button  className=' h-15 px-5  flex items-center justify-end  w-[50%]' onClick={Handle}>
    <BiLogOut className=' text-one h-8  w-8'/>
      </button>
      </div>
                )}


    </div>
  );
}

export default Home;
