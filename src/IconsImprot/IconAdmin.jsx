import React from 'react'
import { RiAdminFill } from "react-icons/ri";

const IconAdmin =({ active }) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  return (
<RiAdminFill  className={`text-2xl `} color={iconColor} />
  )
}

export default IconAdmin