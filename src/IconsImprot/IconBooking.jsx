import React from 'react'

const IconBooking =  ({ active }) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  
  return (
    <div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_122_2032)">
<path d="M18.5806 2.32258V0H17.0323V2.32258H6.19355V0H4.64516V2.32258H0V11.6129V24H23.2258V11.6129V2.32258H18.5806ZM1.54839 3.87097H4.64516V6.19355H6.19355V3.87097H17.0323V6.19355H18.5806V3.87097H21.6774V10.0645H1.54839V3.87097ZM21.6774 22.4516H1.54839V11.6129H21.6774V22.4516Z"   fill={iconColor} 
        stroke={iconColor} />
</g>
<defs>
<clipPath id="clip0_122_2032">
<rect width="23.2258" height="24"   fill={iconColor} 
        stroke={iconColor} />
</clipPath>
</defs>
</svg>

    </div>
  )
}

export default IconBooking
