  import React, { useEffect, useState } from 'react';
  import delet from '../../assets/delete.svg';
  import pin from '../../assets/pin.svg';
  import ThreeThing from '../../component/ThreeThing';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import Swal from 'sweetalert2';
  import { CiSearch } from "react-icons/ci";
  import { ToastContainer,toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Pagination from '@mui/material/Pagination';

  const User = () => {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [selectedFilter, setSelectedFilter] = useState(''); 
    const navigate = useNavigate();

   
 
    useEffect(() => {
      const token = localStorage.getItem('token');

      axios.get("https://bcknd.ticket-hub.net/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setData(response.data.data);
  
        })
        .catch(() => {
          toast.error("Error fetching data")
        });
    }, [update]);

    const handleDelete = (index, userName) => {
      const token = localStorage.getItem('token');
      
      Swal.fire({
        title: `Are you sure you want to delete ${userName}?`, 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://bcknd.ticket-hub.net/api/admin/user/delete/${index}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(() => {
              setUpdate(!update);
              Swal.fire('Deleted!', `${userName} has been deleted successfully.`, 'success'); 
            })
            .catch(() => {
              Swal.fire('Error!', `There was an error while deleting ${userName}.`, 'error'); 
            });
        } else {
          Swal.fire('Cancelled', `${userName} was not deleted.`, 'info');  
        }
      });
    };

    const handleEdit = (index) => {
      const sendData = data.find((item) => item.id === index);
      navigate('/AddUser', { state: { sendData } });
    };

    const Details = (index) => {
      const sendData = data.find((item) => item.id === index);
      navigate('/UserDetails', { state: { sendData } });
    };

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
  const cheose = ["Filter","name", "email", "country", "city", "zone"]
  const labelMap = {
    Filter: "Filter",
    name: "name",
    email: "Gmail",
    country: "country",
    city:"city",
    zone:"Zone"
  };

    const names = ["User","phone", "email", "Country", "Cities", "Zones", "Action"];
    const fieldsToShow = ["name","phone", "email", "country", "city", "zone",];
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
  
          </div>
          <ThreeThing 
            navGo='/AddUser' 
            liked 
            labelMap={labelMap}
            cheose={cheose} // Pass the cheose array to ThreeThing component
            selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
            setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
          />
        
        </div>

        {/* Table for larger screens */}
        <div className="mt-10 ml-5 hidden lg:block">
          <table className="w-full border-y border-x border-black ">
            <thead className="w-full ">
              <tr className='bg-four w-[1012px] h-[56px]'>
                <th className="w-[10px] h-[56px] text-[14px] border-b text-left px-1">S/N</th>
                <th className="w-[200px] h-[56px] text-[14px] border-b text-left ">User</th>
                <th className="w-[200px] h-[56px] text-[14px] border-b   lg:text-center xl:text-start">Gmail</th>
                <th className="w-[158px] h-[56px] text-[14px] border-b text-left">Country</th>
                <th className="w-[158px] h-[56px] text-[14px] border-b text-left">Cities</th>
                <th className="w-[158px] h-[56px] text-[14px] border-b text-left">Zones</th>
                <th className="w-[158px] h-[56px] text-[14px] border-b text-left">Booking</th>
                <th className="w-[158px] h-[56px] text-[14px] border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                  <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[14px] px-1">   
                           {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="flex flex-col w-[200px] h-[56px] absolute top-1 gap-1 items-start justify-start">
                    <span className=" lg:text-[10px] xl:text-[12px]   font-normal text-five px-1">{item?.name??"N//A"}</span>
                    <span className="  lg:text-[10px] xl:text-[12px]   font-normal text-five px-1">{item?.phone??"N//A"}</span>
                  </td> 
                  <td className="w-[200px]   h-[56px] text-[10px]  px-1 ">{item?.email??"N//A"}</td>
                  <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[14px] px-1">{item?.country??"N//A"}</td>
                  <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[14px] px-1">{item?.city??"N//A"}</td>
                  <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[14px] px-1">{item?.zone??"N//A"}</td>
                  <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[14px] px-1">
                    <button className='underline' onClick={() => Details(item.id)}>Details</button>
                  </td>
                  <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[14px] flex justify-start items-center">
                    <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
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
      {paginatedData.map((item, index) => (
        <div key={index} className='flex flex-col gap-4 p-3'>
          
          <span>S/N :  {(currentPage - 1) * rowsPerPage + index + 1} </span>
          {fieldsToShow.map((field, i) => (
            
                  <div key={i} className="flex gap-4">
                    <span><strong>{names[i]}:</strong></span>
                    <span>{item[field] ? item[field] : "N//A"}</span>
                  </div>
                ))}
                <div> 
                  <strong>Booking:</strong>
        <button className='underline' onClick={() => Details(item.id)}>Details</button>
                </div>
          <div className='flex'><img className='w-[24px] h-[24px]' src={pin} 
                    onClick={()=>handleEdit(item.id)}/>
                    <img
                      className='w-[24px] h-[24px] ml-2 cursor-pointer'
                      src={delet}
                      onClick={() => handleDelete(item.id,item.name)}   
                      alt="delete"
                    /> </div>
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
      </div>
    );
  };


  export default User;
