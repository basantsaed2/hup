import React, { useEffect, useState} from 'react';
import ThreeThing from '../../component/ThreeThing'
import axios from 'axios';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';


const PendingPayments = () => {
  const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    
          const [searchQuery, setSearchQuery] = useState(''); // State for search query
            const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
          
    useEffect(()=>{
      const token = localStorage.getItem('token');
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/canceled_payments", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
        .then(response => {
          setData(response.data.canceledPayment);
  
        })
        .catch(() => {
              toast.error("Error fetching data")
            });
    },[update])
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
    const cheose = ["Filter","amount","travelers",'travel_date',"total","status"]
    const labelMap = {
      Filter: "Filter",
      amount: "amount",
      travelers: "travelers",
      travel_date:"travel_date",
      total:"total",
      status:"status"
    };
    
          const [currentPage, setCurrentPage] = useState(1);
       const rowsPerPage = 10;
          const pageCount = Math.ceil(filteredData.length / rowsPerPage);
          const paginatedData = filteredData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          );
        useEffect(() => {
          setCurrentPage(1);
        }, [searchQuery]);
  return (
    <div>
              <ToastContainer />
      
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
      <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                S/N
              </th>
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">amount</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">receipt image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">travelers</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">travel_date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">total</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">status</th>
                </tr>
              </thead>
              <tbody>
               
              {filteredData.map((item,index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                   <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                    <td className="w-[143px] h-[56px]  text-[16px]  px-2">{item?.amount??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">  <img  className="w-5 h-5"src={item.receipt_image===null?`data:image/png;base64,${item.receipt_image}`:item.receipt_image}/> </td>
                    <td className="w-[143px] h-[56px]  text-[16px] ">{item?.travelers??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] ">{item?.travel_date??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.total??"N//A"}</td>
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
                <strong>S/N :</strong>
                <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
              </div>
              <div className="flex gap-4">
                <strong>amount:</strong>
                <span>{item.amount}</span>
              </div>
              <div className="flex gap-4">
          <strong>receipt:</strong>
          <img 
            className="w-5 h-5"
            src={item.receipt_image === null ? `data:image/png;base64,${item.receipt_image}` : item.receipt_image}
          />
        </div>
              <div className="flex gap-4">
                <strong>travelers:</strong>
                <span>{item.travelers}</span>
              </div>
              <div className="flex gap-4">
                <strong>travel_date:</strong>
                <span>{item.travel_date}</span>
              </div>
            
              <div className="flex gap-4">
                <strong>total:</strong>
                <span>{item.total}</span>
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
        <div className="flex justify-center mt-4">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#F58220",
                    "&.Mui-selected": {
                      backgroundColor: "#F58220",
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#f5923a", // درجة أفتح عند الـhover (اختياري)
                    },
                  },
                }}
                shape="rounded"
              />
            </div>
    </div>
  )
}
export default PendingPayments
