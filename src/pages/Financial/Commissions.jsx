import React, { useEffect, useState} from 'react';
import ThreeThing from '../../component/ThreeThing'
import axios from 'axios';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';

const Commissions = () => {
  const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    
          const [searchQuery, setSearchQuery] = useState(''); // State for search query
            const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
          
    useEffect(()=>{
      const token = localStorage.getItem('token');
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/confirmed_payments", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
        .then(response => {
          setData(response.data.confirmedPayment);
  
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
      const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  }
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
      
         {/* <ThreeThing navGo='/Location/AddZones' like/> */}
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

                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">Amount</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Receipt Image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Travelers</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Travel_date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Total</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
               
              {paginatedData.map((item,index) => (
                <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                   <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-2">{item?.amount??"N//A"}</td>
   <td className="w-[143px] h-[56px] text-[16px]">
            <img
              className="w-10 h-10 cursor-pointer"
              src={item.receipt_image === null ? `data:image/png;base64,${item.receipt_image}` : item.receipt_image}
              alt="Receipt"
              onClick={() => openModal(item.receipt_image === null ? `data:image/png;base64,${item.receipt_image}` : item.receipt_image)}
            />
          </td>                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.travelers??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.travel_date??"N//A"}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item?.total??"N//A"}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                    
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
                <strong>Amount:</strong>
                <span>{item?.amount??"N//A"}</span>
              </div>
              <div className="flex gap-4">
          <strong>Receipt:</strong>
          <img 
            src={item.receipt_image === null ? `data:image/png;base64,${item.receipt_image}` : item.receipt_image}
              className="w-5 h-5 cursor-pointer"
              alt="Receipt"
              onClick={() => openModal(item.receipt_image === null ? `data:image/png;base64,${item.receipt_image}` : item.receipt_image)}
          />
        </div>
              <div className="flex gap-4">
                <strong>Travelers:</strong>
                <span>{item?.travelers??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Travel_date:</strong>
                <span>{item?.travel_date??"N//A"}</span>
              </div>
       
              <div className="flex gap-4">
                <strong>Total:</strong>
                <span>{item?.total??"N//A"}</span>
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
            {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={modalImage}
              alt="no Image"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-6xl"
            >
              &times; 
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Commissions
