import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci"; // Importing search icon
  import 'react-toastify/dist/ReactToastify.css';
  import Pagination from '@mui/material/Pagination';
import ThreeThing from '../../component/ThreeThing'
const PrivateRequest = () => {
      const [data, setData] = useState([]);
      const [agent, setAgaent] = useState([]);
          const [update, setUpdate] = useState(false);
            const [searchQuery, setSearchQuery] = useState(''); 
            const [selectedFilter, setSelectedFilter] = useState(''); 
                  const [isModalOpen, setIsModalOpen] = useState(false);
                  const [idreq,Setidreq]=useState("")
const [selectedAgentId, setSelectedAgentId] = useState('');
            
            useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get("https://bcknd.ticket-hub.net/api/admin/private_request", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.private_request);
        setAgaent(response.data.agents);
      })
       .catch(() => {
               toast.error("Error fetching data")
             });
  }, [update]);

   useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);

    const filteredData = data.filter((item) => {
  const query = searchQuery.toLowerCase();

  // Search through all values if no filter is selected or "Filter"
  if (selectedFilter === "Filter" || selectedFilter === "") {
    return JSON.stringify(item).toLowerCase().includes(query);
  }

  // For nested fields like "from_city.name", split the keys and traverse
  if (selectedFilter.includes(".")) {
    const keys = selectedFilter.split(".");
    let value = item;
    for (const key of keys) {
      value = value?.[key];
    }
    return value?.toString().toLowerCase().includes(query);
  }

  // For normal flat keys
  return item[selectedFilter]?.toString().toLowerCase().includes(query);
});

const cheose = ["Filter","user","date", "traveler","address","from_city.name","to_city.name", "category.name","status"]
  const labelMap = {
    Filter: "Filter",
    user:"user",
    date: " date",
    traveler: "traveler",
    address: "address",
    "from_city.name": "from",
    "to_city.name": "to",
    "category.name": "category",
    status:"status"
  };
    const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 10;
        const pageCount = Math.ceil(filteredData.length / rowsPerPage);
        const paginatedData = filteredData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        );
        
  const closeModal = () => {
    Setidreq('')
    setIsModalOpen(false);
  }
  
  const openModal = (id) => {
    setIsModalOpen(true);
    Setidreq(id)
  };
     const handleStatusChange = (agid, ) => {
    const token = localStorage.getItem("token");
    axios
      .post(`https://bcknd.ticket-hub.net/api/admin/private_request/determin_agent`, {
        agent_id: agid,
        private_request_id:idreq
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Status updated successfully");
        setUpdate(!update)
            setIsModalOpen(false);

       
      })
      
      .catch((err) => {
            setIsModalOpen(false);
        toast.success("Status updated fail");

        console.error("Error updating status", err);
      });
  };
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
            <th className="w-[10px] h-[56px] text-[10px] border-b text-left px-1">S/N</th>

              <th className="w-[158px] h-[56px] text-[12px] border-b text-left pl-3">User </th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left pl-3">Address </th>
              <th className="w-[200px] h-[56px] text-[12px] border-b text-left pl-3">From{`-->`}To  </th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left">Date </th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left">traveler</th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left">Category</th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[12px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                  <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">   
                {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                <td className="w-[143px] h-[56px] text-[10px] px-4">{item?.user?.name??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[10px] px-4">{item?.address??"N//A"}</td>
                <td className="w-[180px] h-[56px] text-[10px] px-4">{item?.from_city?.name??"N//A"}{`-->`}{item?.to_city?.name??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[10px] ">{item?.date??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[10px] px-4">{item?.traveler??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[10px] px-1">{item?.category?.name??"N//A"}</td>
                <td className="w-[143px] h-[56px] text-[10px] text-nine">
                  <span className="bg-eight font-normal p-2 rounded-[8px]">{item?.status??"N//A"}</span>
                </td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                  

                  <button     onClick={() => openModal(item.id)} className='bg-three rounded-4xl text-white py-2 px-4 '>Agant</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 {isModalOpen && agent && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="relative bg-white rounded-lg shadow-lg w-[300px] p-6 space-y-4">
      
      <h2 className="text-xl font-semibold text-center text-gray-800">Choose Agent</h2>

      {/* اختيار العميل */}
      <select
        value={selectedAgentId}
        onChange={(e) => setSelectedAgentId(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="" disabled>Pending</option>
        {agent.map((ag) => (
          <option key={ag.id} value={ag.id}>{ag.name}</option>
        ))}
      </select>

      {/* زر التأكيد */}
      <button
        onClick={() => handleStatusChange(selectedAgentId)}
        disabled={!selectedAgentId}
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
      >
        تأكيد
      </button>

      {/* زر الإغلاق */}
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-3xl leading-none"
        title="Close"
      >
        &times;
      </button>
    </div>
  </div>
)}


  <div className="mt-10 ml-5 lg:hidden">
      <div className='w-[95%] bg-six'>
        {paginatedData.map((item, index) => (
          <div key={index} className='flex flex-col gap-4 p-3'>
             <div className="flex gap-4">
                <strong>S/N :</strong>
                <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
              </div>
            <div className="flex gap-4">
              <strong>User:</strong>
              <span>{item?.user?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Address:</strong>
              <span>{item?.address??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>From{`-->`}To  :</strong>
              <span>{item?.from_city?.name??"N//A"}{`-->`}{item?.to_city?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Date:</strong>
              <span>{item?.date??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Date:</strong>
              <span>{item?.date??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>traveler:</strong>
              <span>{item?.traveler??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Category:</strong>
              <span>{item?.category?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Status:</strong>
              <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item?.status??"N//A"}</span>
            </div>
          
            <div className='flex'>
          

                  <button     onClick={() => openModal(item.id)} className='bg-three rounded-4xl text-white py-2 px-4 '>Agant</button>
                  
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

export default PrivateRequest