import React from 'react'
import IconAdd from '../ui/IconAdd'
import filter from '../assets/filter.svg'
const TheeThing = ({navGo,like,labelMap,selectedFilter,cheose,setSelectedFilter}) => {
  const handleChange = (event) => {
    
    setSelectedFilter(event.target.value);
  };
  return (
    <div>
      <div className='w-full h-[48px]   px-10 lg:px-[26px] justify-around  gap-16 flex'>
          <div className='flex justify-center relative items-center gap-4'> 
          {cheose.length !== 0 && (
  <select
           style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            paddingRight: '20px',
            backgroundImage: 'none',
          }}
        value={selectedFilter}
        onChange={handleChange}
        className=' flex justify-center w-20 text-[12px]  items-center h-9 text-white bg-one py-1 px-1 rounded-[8px] gap-1'>
      
      {cheose.map((option, index) => (
  <option key={index} value={option}>
    {labelMap[option] || option}
  </option>
))}


      </select>
          )}
       {cheose.length !== 0 && ( 
         <img src={filter} className='w-4 h-4   text-black font-medium absolute left-15'/>)}


         

      {!like&&(<IconAdd nav={navGo}/>)}  
        </div>  
        </div>
    </div>
  )
}

export default TheeThing
  