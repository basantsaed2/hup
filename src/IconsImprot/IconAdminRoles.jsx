import React from 'react'
import { GrUserAdmin } from "react-icons/gr";

const IconAdminRoles =({ active }) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  return (
<GrUserAdmin className={`text-2xl `} color={iconColor} />
  )
}

export default IconAdminRoles