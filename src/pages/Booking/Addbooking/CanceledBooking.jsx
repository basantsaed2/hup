import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import ThreeThing from '../../../component/ThreeThing'
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const CanceledBooking = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
            const [selectedFilter, setSelectedFilter] = useState(''); 
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/canceled", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bookingCanceled);
      })  .catch(() => {
                toast.error("Error fetching data")
              });
     
  }, [update])

  const filteredData = data.filter((item) => {
    if(selectedFilter==="Filter"){
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedFilter === '') {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });
const cheose = ["Filter","destenation_from","destenation_to",'date',"seats_count",'status',"code"
]
const labelMap = {
Filter: "Filter",
destenation_from: " from",
destenation_to:" to",
date:"date",
seats_count:"seats_count",
status:"status",
code:"code"


};

  return (
 
<div>
          <ToastContainer />
  
<NavBooking/>

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
        <ThreeThing  liked like
           labelMap={labelMap}
           cheose={cheose} // Pass the cheose array to ThreeThing component
           selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
           setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>
      <div className="mt-10 ml-5 hidden lg:block">
      <table className="w-full border-y border-x border-black ">
      <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">destenation_from </th>
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">destenation_to</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">date </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">code </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">seats_count</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
               
              {filteredData.map((item,index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                    <td className="w-[143px] h-[56px]  text-[16px]  px-1 ">{item?.destenation_from??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.destenation_to??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.date??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.code??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.seats_count??"N//A"}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
          <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
              <div className="flex gap-4">
                <strong>destenation_from:</strong>
                <span>{item?.destenation_from??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>destenation_to:</strong>
                <span>{item?.destenation_to??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>date:</strong>
                <span>{item?.date??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>seats_count:</strong>
                <span>{item?.seats_count??"N//A"}</span>
              </div>
             
              <div className="flex gap-4">
                <strong>code:</strong>
                <span>{item?.code??"N//A"}</span>
              </div>
             
              
              <div className="flex gap-4">
          <strong>Status:</strong>
          <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item.status}</span>
        </div>
     
              <div className='w-full bg-white h-2'></div>
            </div>
          ))}
        </div>
      </div>
      </div>
  )
}

export default CanceledBooking
