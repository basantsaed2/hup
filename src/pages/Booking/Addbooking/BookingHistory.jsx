import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../../component/ThreeThing'
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
        const [selectedFilter, setSelectedFilter] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bookings);

      }).catch(() => {
                toast.error("Error fetching data")
              });
     
  }, [update])

  const Details = (index) => {
    const sendData = data.find((item) => item.id === index);  
    navigate('/Bookingdetailsmore', { state: { sendData}});
  }
  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase();
  
    if (selectedFilter === "Filter" || selectedFilter === "") {
      return JSON.stringify(item).toLowerCase().includes(query);
    }
  
    switch (selectedFilter) {
      case "Route":
        return (
          item.trip?.trip_name?.toLowerCase().includes(query) ||
          item.destnation_from?.name?.toLowerCase().includes(query) ||
          item.destnation_to?.name?.toLowerCase().includes(query)
        );
  
      case "Date":
        return item.date?.toLowerCase().includes(query);
  
      case "country":
        return (
          item.trip?.country?.name?.toLowerCase().includes(query)
        );
  
      case "Time":
        return (
          item.trip?.deputre_time?.toLowerCase().includes(query) 
        );
  
      default:
        return false;
    }
  });
  

const cheose = ["Filter","Route","Date","country",'Time'
]
const labelMap = {
Filter: "Filter",
name: "Route",
email:"country",
phone:"Time",
country:"country",



};
  return (

    <div>
              <ToastContainer />
      
      <NavBooking />
      <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing like liked
           labelMap={labelMap}
           cheose={cheose} // Pass the cheose array to ThreeThing component
           selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
           setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>
      <div className="mt-10 ml-5 hidden lg:block">
      <table className="w-full border-y border-x border-black ">
      <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
            <th className="text-left px-2 ">Route</th>
              <th className="text-left px-2">Date</th>
              <th className="text-left ">country </th>
              <th className="text-left px-2">Time</th>
              <th className="text-left px-2">Booking</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((item, index) => (
                      <tr
                      key={index}
                      className="border-y hover:border-4 relative hover:bg-six"
                    >
                      <td className="w-[143px] h-[56px]  text-[16px] font-normal text-five px-1 ">
                  {`${item?.trip?.city?.name??"N//A"}-->${item?.trip?.to_city.name??"N//A"}`}
                      </td>
    
                      <td className="w-[143px] h-[56px]  px-1">{item?.date??"N//A"}</td>
                      <td className="w-[143px] h-[56px] px-1">{item?.trip?.country.name??"N//A"}</td>
                      <td className="w-[143px] h-[56px] px-1">{item?.trip?.deputre_time??"N//A"}</td>
                      <td className="w-[143px] h-[56px] px-1">
                        <button className="underline bg-three text-white rounded-3xl px-2 py-1" onClick={() => Details(item.id)}>Details</button>
                      </td>
                    </tr>

            ))}
          </tbody>
        </table>
      </div>
            {/* Mobile view */}
      <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
              <div className="flex gap-4">
                <strong>Route:</strong>
                <span>   
                   {`${item?.trip?.city?.name??"N//A"}-->${item?.trip?.to_city.name??"N//A"}`}</span>
              </div>
             
            
             
              <div className="flex gap-4">
                <strong>Date:</strong>
                <span>{item?.date??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>country residence:</strong>
                <span>{item?.trip?.country.name??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>city:</strong>
                <span>{item?.city??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>Time:</strong>
                <span>{item?.trip?.deputre_time??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Details:</strong>
                <button className='underline bg-three px-2 py-1 rounded-4xl' 
                onClick={()=>Details(item.id)}>Details</button>
                              </div>
             
              
           
              <div className='w-full bg-white h-2'></div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default BookingHistory
