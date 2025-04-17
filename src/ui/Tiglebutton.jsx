import React from 'react';

const Tiglebutton = ({ action, onClick ,title }) => {

  const style = action === "on"
    ? ' bg-ten  '
    : 'border-three border ';

  return (
    <button onClick={onClick} className={`${style} w-[265px] h-[56px]  font-medium text-[20px] text-one`}>
      {title}
    </button>
  );
};

export default Tiglebutton;
