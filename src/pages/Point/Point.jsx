import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci"; // Importing search icon
  import 'react-toastify/dist/ReactToastify.css';
  import Pagination from '@mui/material/Pagination';
  import { useNavigate } from 'react-router-dom';
  import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import ThreeThing from '../../component/ThreeThing'
const Point = () => {
  const token = localStorage.getItem('token');

     const [data, setData] = useState([]);
          const [update, setUpdate] = useState(false);
            const [searchQuery, setSearchQuery] = useState(''); 
            const [selectedFilter, setSelectedFilter] = useState(''); 
    const navigate = useNavigate();

             useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get("https://bcknd.ticket-hub.net/api/admin/currency_point", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        setData(response.data.redeem_points);
      })
       .catch(() => {
               toast.error("Error fetching data")
             });
  }, [update]); 

   useEffect(() => {
        setCurrentPage(1);
      }, [searchQuery]);
   
 const handleDelete = (index, busNumber) => {
    Swal.fire({
      title: `Are you sure you want to delete bus ${busNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/currency_point/delete/${index}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            setUpdate(!update);
            Swal.fire('Deleted!', `${busNumber} has been deleted successfully.`, 'success');
          })
          .catch(() => {
            Swal.fire('Error!', `There was an error while deleting bus ${busNumber}.`, 'error');
          });
      } else {
        Swal.fire('Cancelled', `Bus ${busNumber} was not deleted.`, 'info');
      }
    });
  };

  const handleEdit = (index) => {
    const sendData = data.find((item) => item.id === index);
    navigate('/AddPoint', { state: { sendData } });
  };
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

const cheose = ["Filter","points","currencies","currency"]
  const labelMap = {
    Filter: "Filter",
    points:"points",
    currencies: " currencies",
    currency: " currency",
   
  };
    const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 10;
        const pageCount = Math.ceil(filteredData.length / rowsPerPage);
        const paginatedData = filteredData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        );

  return (
    <div>        <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing navGo="/AddPoint" 
        labelMap={labelMap}
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
     />
      </div>
      
        <div className="mt-10 ml-5 hidden lg:block">
         <table className="w-full border-y border-x border-black ">
         <thead className="w-full">
               <tr className='bg-four w-[1012px] h-[56px]'>
               <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">S/N</th>
   
                 <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">Points </th>
                 <th className="w-[158px] h-[56px] text-[16px] border-b text-left">currencies</th>
                 <th className="w-[158px] h-[56px] text-[16px] border-b text-left">currency</th>
                 <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
               </tr>
             </thead>
             <tbody>
               {paginatedData.map((item, index) => (
                   <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                      <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">   
                   {(currentPage - 1) * rowsPerPage + index + 1}
          </td>
                   <td className="w-[140px] h-[56px] text-[16px] px-2">{item?.points??"N//A"}</td>
                   <td className="w-[140px] h-[56px] text-[12px]">{item?.currencies??"N//A"}</td>
                   <td className="w-[140px] h-[56px] text-[12px]">{item?.currency.name??"N//A"}{item?.currency.symbol??"N//A"}</td>
                   <td className="w-[140px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                     <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                     <img
                       className='w-[24px] h-[24px] ml-2 cursor-pointer'
                       src={delet}
                       onClick={() => handleDelete(item.id, item.points)}
                       alt="delete"
                     />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         
         <div className="mt-10 ml-5 lg:hidden">
           <div className='w-[95%] bg-six'>
           {filteredData.length !== 0 && filteredData.map((item, index) => (
               <div key={index} className='flex flex-col gap-4 p-3'>
                   <div className="flex gap-4">
                         <strong>S/N :</strong>
                         <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
                       </div>
                 <div className="flex gap-4">
                   <strong>Points :</strong>
                   <span>{item?.points??"N//A"}</span>
                 </div>
                 <div className="flex gap-4">
                   <strong>currencies :</strong>
                   <span>{item?.currencies??"N//A"}</span>
                 </div>
                 <div className="flex gap-4">
                   <strong>currency:</strong>
                   <span>{item?.currency.name??"N//A"}{item?.currency.symbol??"N//A"}</span>
                 </div>
               
                
                 <div className='flex'>
                   <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                   <img
                     className='w-[24px] h-[24px] ml-2 cursor-pointer'
                     src={delet}
                     onClick={() => handleDelete(item.id,)}   
                     alt="delete"
                   />
                 </div>
                 <div className='w-full bg-white h-2'></div>
               </div>
             ))}
           </div>
         </div>
         <div className='flex justify-center mt-5'>

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
      </div>
  )
}

export default Point