import React from 'react'

const Privaterequest = ({ active }) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  return (
    <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
<path d="M20 20V10C20 8.9 19.1 8 18 8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20ZM14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15Z" fill={iconColor}/>
<path d="M17 12C17 11.6 17 7.4 17 7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7C7 7.4 7 11.6 7 12" stroke={iconColor} strokeWidth="2" strokeMiterlimit="10"/>
</svg>

</div>
  )
}

export default Privaterequest