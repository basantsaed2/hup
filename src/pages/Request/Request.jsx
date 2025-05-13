import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci"; // Importing search icon
  import 'react-toastify/dist/ReactToastify.css';
  import Pagination from '@mui/material/Pagination';
import ThreeThing from '../../component/ThreeThing'
const Request = () => {
     const [data, setData] = useState([]);
      const [update, setUpdate] = useState(false);
        const [searchQuery, setSearchQuery] = useState(''); 
        const [selectedFilter, setSelectedFilter] = useState(''); 
         useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get("https://bcknd.ticket-hub.net/api/admin/trip_request", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.pending_trips);
      })
       .catch(() => {
               toast.error("Error fetching data")
             });
  }, [update]);

  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase();
  
    if (selectedFilter === "Filter" || selectedFilter === "") {
      return JSON.stringify(item).toLowerCase().includes(query);
    }
  
    switch (selectedFilter) {
      case "agent":
        return item.agent?.name?.toLowerCase().includes(query) 
  
      case "trip_name":
        return item.trip_name?.toLowerCase().includes(query);
  
      case "trip_type":
        return (
          item.trip_type?.toLowerCase().includes(query)
        );
  
      case "status":
        return (
          item.status?.toLowerCase().includes(query) 
        );
  
      default:
        return false;
    }
  });


        const handleStatusChange = (ids, newStatus) => {
    console.log(ids, newStatus)
    const token = localStorage.getItem("token");
    axios
      .put(`https://bcknd.ticket-hub.net/api/admin/trip_request/status/${ids}`, {
        request_status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Status updated successfully");
        setUpdate(!update)
        
      })
      
      .catch((err) => {
        toast.success("Status updated fail");
        console.error("Error updating status", err);
      });
  };
    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);

const cheose = ["Filter","trip_name", "agent","trip_type","status"]
  const labelMap = {
    Filter: "Filter",
    trip_name: " trip",
    agent: "agent",
    trip_type: "type",
    status:"status"
  };
        const [currentPage, setCurrentPage] = useState(1);
      const rowsPerPage = 10;
      const pageCount = Math.ceil(filteredData.length / rowsPerPage);
      const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );
  return (
    <div>

        <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing like 
        labelMap={labelMap}
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
     />
      </div>

   <div className="mt-10 ml-5 hidden lg:block">
        <table className="w-full  border-y border-x border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
            <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">S/N</th>

              <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">Trip </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Agent </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Type</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                  <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">   
                {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                <td className="w-[143px] h-[56px] text-[16px] px-4">{item?.trip_name??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[16px] ">{item?.agent?.name??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[16px] px-4">{item?.trip_type??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[16px] text-nine">
                  <span className="bg-eight font-normal p-2 rounded-[8px]">{item?.status??"N//A"}</span>
                </td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                  

                    <select
                      value={item.request_status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="border p-1 rounded bg-three text-white text-[12px] md:text-[14px]"
                      style={{minWidth: '100px'}}
                    >
  <option value="pending" disabled>Pending</option>  
                 
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


  <div className="mt-10 ml-5 lg:hidden">
      <div className='w-[95%] bg-six'>
        {paginatedData.map((item, index) => (
          <div key={index} className='flex flex-col gap-4 p-3'>
             <div className="flex gap-4">
                <strong>S/N :</strong>
                <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
              </div>
            <div className="flex gap-4">
              <strong>Trip:</strong>
              <span>{item?.trip_name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Agent:</strong>
              <span>{item?.agent?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>type:</strong>
              <span>{item?.trip_type??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Status:</strong>
              <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item?.status??"N//A"}</span>
            </div>
          
            <div className='flex'>
          
                    <select
                      value={item.request_status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="border p-1 rounded bg-three text-white text-[12px] md:text-[14px]"
                      style={{minWidth: '100px'}}
                    >
  <option value="pending" disabled>Pending</option>  
                 
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                    </select>
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
                  '& .MuiPaginationItem-root': {
                    color: '#F58220',
                    '&.Mui-selected': {
                      backgroundColor: '#F58220',
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: '#f5923a', // درجة أفتح عند الـhover (اختياري)
                    },
                  },
                }}   shape="rounded"
              />
            </div>
              <ToastContainer />
      
    </div>
  )
}

export default Request