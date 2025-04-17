import React from 'react'
import { useNavigate } from 'react-router-dom';

const Picdone = ({ src, navGo}) => {
    const navigate = useNavigate();

  return (
    <button className='mt-6' onClick={() => 
      navigate(navGo)
    }>
      <img src={src} />
    </button>
  );
}

export default Picdone;
