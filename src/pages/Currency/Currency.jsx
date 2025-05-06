import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing'
import { CiSearch } from "react-icons/ci"; // Import search icon for UI  import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';

const Currency = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
     const [searchQuery, setSearchQuery] = useState(''); // State for search query
          const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
        
      
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/currencies", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.currancies);

      })
       .catch(() => {
              toast.error("Error fetching data")
            });
  }, [update])
  const handleDelete = (index, subject_id) => {
    const token = localStorage.getItem('token');

    Swal.fire({
      title: `Are you sure you want to delete ${subject_id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/currency/delete/${index}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            setUpdate(!update);
            Swal.fire('Deleted!', `${subject_id} has been deleted successfully.`, 'success');
          })
          .catch(() => {
            Swal.fire('Error!', `There was an error while deleting ${subject_id}.`, 'error');
          });
      } else {

        Swal.fire('Cancelled', `${subject_id} was not deleted.`, 'info');
      }
    });
  };
  const handleEdit = (index) => {
    const sendData = data.find((item) => item.id === index);
    navigate('/AddCurrency', { state: { sendData } });
  }
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
  const cheose = ["Filter","name","symbol","status"]
  const labelMap = {
    Filter: "Filter",
    name: "name",
    symbol: "symbol",
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
        <ThreeThing navGo='/AddCurrency' liked 
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
            <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                S/N
              </th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">name</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">symbol </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                       <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item?.name??"N//A"}</td>


                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item?.symbol??"N//A"}</td>
              {item.status===1?(  
                             <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">active</span></td>
):(
  <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">inactive</span></td>

)} 
                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]'
                    onClick={() => handleEdit(item.id)}
                    src={pin} />
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id, item.name)}
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
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
                <div className="flex gap-4">
                <strong>S/N :</strong>
                <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
              </div>
              <div className="flex gap-4">
                <strong>name:</strong>
                <span>{item?.name??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>symbol:</strong>
                <span>{item?.symbol??"N//A"}</span>
              </div>
              <div className="flex gap-2">
                <strong>Status:</strong>
                {item.status===1?(  
                             <td className=" text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">active</span></td>
):(
  <td className="  h- text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">inactive</span></td>

)}               </div>
             
              <div className='flex'>
                <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                <img
                  className='w-[24px] h-[24px] ml-2 cursor-pointer'
                  src={delet}
                  onClick={() => handleDelete(item.id,item.name)}   
                  alt="delete"
                />
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

export default Currency
