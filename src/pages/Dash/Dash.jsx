import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import mainicon from "../../assets/mainicon.svg";
import ro from "../../assets/ro.svg";
import IconHome from '../../IconsImprot/IconHome';
import IconUser from '../../IconsImprot/IconUser';
import IconLocation from '../../IconsImprot/IconLocation';
import IconBuses from '../../IconsImprot/IconBuses';
import IconTrips from '../../IconsImprot/IconTrips';
import IconBooking from '../../IconsImprot/IconBooking';
import IconFinancial from '../../IconsImprot/IconFinancial';
import IconAgents from '../../IconsImprot/IconAgents';
import IconComplaints from '../../IconsImprot/IconComplaints';
import IconCommissionSetup from '../../IconsImprot/IconCommissionSetup';
import IconCurrency from '../../IconsImprot/IconCurrency';
import IconPayoutAccount from '../../IconsImprot/IconPayoutAccount';
import IconSetting from '../../IconsImprot/IconSetting';
import IconTrain from '../../IconsImprot/IconTrain';
import { FaCarAlt } from "react-icons/fa";
import { TbCarSuv } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

import { IoIosArrowDown } from "react-icons/io";

const Dash = ({ activeLink ,open ,setopen}) => {
  const [openFinancial, setOpenFinancial] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const handleopen = () => {
    setopen(!open);

}
  
  const menuItems = [
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Home", href: "/Homes" },
    { icon: <IconUser />, iconactive: <IconUser active />, text: "User", href: "/User" },
        { icon: <IconAgents />, iconactive: <IconAgents active />, text: "Operator", href: "/Agents" },

    { icon: <IconLocation />, iconactive: <IconLocation active />, text: "Location", href: "/Location" },
    { icon: <IconBuses />, iconactive: <IconBuses active />, text: "Buses", href: "/Buses" },
    { icon: <TbCarSuv  className='text-white w-5 h-5'/>, iconactive: <TbCarSuv  className='w-5 h-5 text-one' active />, text: "Mini van ", href: "/Minivan" },

    { icon: <IconTrain />, iconactive: <IconTrain active />, text: "Train", href: "/Train" },
    { icon: <IconBooking />, iconactive: <IconBooking active />, text: "Bookings", href: "/Booking" },
    { icon: <IconTrips />, iconactive: <IconTrips active />, text: "Trips", href: "/Trips" },
    { icon: <FaCarAlt  className='text-white w-5 h-5'/>, iconactive: <FaCarAlt  className='w-5 h-5 text-one' active />, text: "Car", href: "/Car" },
    {
      icon: <IconFinancial />, iconactive: <IconFinancial active />, text: "Financial", options: [
        { text: "● pending payments  ", href: "/Financial/Payments" },
        { text: "● confirmed payments", href: "/Financial/Commissions" },
        { text: "● canceled payments   ", href: "/Financial/PendingPayments" }
      ]  
    },
    // { icon: <IconComplaints />, iconactive: <IconComplaints active />, text: "Complaints", href: "/Complaints" },
    { icon: <IconCurrency />, iconactive: <IconCurrency active />, text: "Currency", href: "/Currency" },
    { icon: <IconPayoutAccount />, iconactive: <IconPayoutAccount active />, text: "Payout Account", href: "/Allpayot" },
    {
      icon: <IconSetting />, iconactive: <IconSetting active />, text: "Settings", settingsOptions:
        [
          { text: "● Payment Methods", href: "/Settings/PaymentMethods" },
          { text: "●  Nationality", href: "/Settings/Nationality" },
          { text: "●  Subject Complaints", href: "/Settings/SubjectComplaints" },
          { text: "●  Operator Payment", href: "/Settings/OperatorPayment" },
          { text: "●  Fees", href: "/Settings/Fees" },
        ]
    },
        { icon: <IconCommissionSetup />, iconactive: <IconCommissionSetup active />, text: "Commission Setup", href: "/Commission" },

  ];


  return (
    
    <div className='h-full '>

      <nav   style={{ 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none'
        }}
 className="hidden lg:block space-y-3 w-[300px] pt-6 text-center px-3 h-[calc(100vh-1px)] overflow-y-auto  overflow-x-hidden">
     
          <div className='flex mx-auto justify-center gap-2 my-3'>
            <span className='font-[400] text-white text-[32px]'>Ticket hub</span>
            <img src={mainicon} className='rounded-full p-1 bg-three' alt="Main Icon" />
          </div>

          {/* Separator Line */}
          <div className='bg-white w-[240px] h-0.5 text-center mx-auto'></div>

          {/* Main Menu Items */}
          <ul className=' p-0'>
            {menuItems.map((item, index) => (
              item.text === "Financial" || item.text === "Settings" ? (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      if (item.text === "Financial") {
                        setOpenFinancial(!openFinancial);
                      }
                      if (item.text === "Settings") {
                        setOpenSettings(!openSettings);
                      }
                    }}
                    className={`flex justify-start items-center mx-3 w-[250px] relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    <i className={`text-[16px] font-medium ml-4`}>
                      {item.icon}
                    </i>
                    <span className='text-[16px] font-medium ml-4 text-white flex items-center gap-1'>
                     <span>
                       {item.text} 
                      </span>
                      {item.text === "Financial" && (
  <MdArrowForwardIos
    className={`mx-3 transform transition duration-300 pt-1 ${openFinancial ? 'rotate-90' : ''}`}
  />
)}
{item.text === "Settings" && (
  <MdArrowForwardIos
    className={`mx-3 transform transition duration-300  pt-1  ${openSettings ? 'rotate-90' : ''}`}
  />
)}

                    </span>
                  </NavLink>

                  {/* Dropdown Menu for Financial */}
                  {item.text === "Financial" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openFinancial ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.options.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={`ml-2   flex gap-1 ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-49 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.text === "Settings" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openSettings ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.settingsOptions.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2  flex gap-1${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>

<span className={` ${activeLink === option.href ? 'text-one' : 'text-white'   }`}>
                       {option.text} 
                      </span>
                      
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-49 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === item.href ? 'bg-white' : ''
                      } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    {activeLink === item.href && (
                      <img
                        src={ro}
                        className="absolute left-49 transition-transform w-15 h-15"
                        alt="Icon"
                      />
                    )}
                    <i className={`text-[16px] font-medium ml-4`}>
                      {activeLink === item.href ? item.iconactive : item.icon}
                    </i>
                    <span className={`text-[16px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </nav>
      
     
     
  {open&&(

     <div className={`direction-rtl fixed  z-100  lg:hidden`}>
        <div className='flex-col w-[200px] sm:w-[300px]  h-screen bg-one text-center overflow-y-scroll overflow-x-hidden direction-ltr'>
        <div className='flex '>
          <div className='flex mx-auto justify-center gap-2 my-3'>
            <span className='font-[400] text-white text-[16px]'>Ticket hub</span>
            <img src={mainicon} className='rounded-full w-6 h-6 p-1 bg-three' alt="Main Icon" />
          </div>
          {open &&(
          
          <div className='flex justify-center items-center'>
            <button className='w-10 h-10' onClick={handleopen}>
              <IoIosCloseCircle  className='text-white w-7 h-7'/>
            </button> 
            
          </div>
                    )}           </div>
          {/* Separator Line */}
          <div className='bg-white w-[160px] h-0.5 text-center mx-auto'></div>

          {/* Main Menu Items */}
          <ul className=' p-0'>
            {menuItems.map((item, index) => (
              item.text === "Financial" || item.text === "Settings" ? (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      if (item.text === "Financial") {
                        setOpenFinancial(!openFinancial);
                      }
                      if (item.text === "Settings") {
                        setOpenSettings(!openSettings);
                      }
                    }}
                    className={`flex justify-start items-center mx-3 w-[120px] relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    <i className={`text-[8px] font-medium ml-4`}>
                      {item.icon}
                    </i>
                    <span className='text-[8px] font-medium ml-4 text-white flex gap-1'>
                      <span>
                      {item.text}
                      </span>
                           <IoIosArrowDown />  
                    </span>
                  </NavLink>

                  {/* Dropdown Menu for Financial */}
                  {item.text === "Financial" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openFinancial ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.options.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2 text-[8px] ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}                 

                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-18 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.text === "Settings" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openSettings ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.settingsOptions.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2 text-[8px] ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}                     

                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-18 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === item.href ? 'bg-white' : ''
                      } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    {activeLink === item.href && (
                      <img
                        src={ro}
                        className="absolute left-20 transition-transform w-15 h-15"
                        alt="Icon"
                      />
                    )}
                    <i className={`text-[8px] font-medium ml-4`}>
                      {activeLink === item.href ? item.iconactive : item.icon}
                    </i>
                    <span className={`text-[8px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
      </div>
    </div>
       )} 


 
    </div>
  );
};

export default Dash;
