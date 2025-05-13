import React from 'react'

const IconPoint = ({active}) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  return (
   <div>   <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor} xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 0C6.537 0 1.5 5.037 1.5 11.25C1.5 17.463 6.537 22.5 12.75 22.5C18.963 22.5 24 17.463 24 11.25C24 5.037 18.963 0 12.75 0ZM12.75 19.5C8.202 19.5 4.5 15.7995 4.5 11.25C4.5 6.7005 8.202 3 12.75 3C17.298 3 21 6.7005 21 11.25C21 15.7995 17.298 19.5 12.75 19.5Z" fill={iconColor}/>
<path d="M12.75 18C16.4779 18 19.5 14.9779 19.5 11.25C19.5 7.52208 16.4779 4.5 12.75 4.5C9.02208 4.5 6 7.52208 6 11.25C6 14.9779 9.02208 18 12.75 18Z" fill={iconColor}/>
</svg>

</div>
  )
}

export default IconPoint