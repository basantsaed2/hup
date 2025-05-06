import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBuses from './NavBuses.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing.jsx';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Pagination from '@mui/material/Pagination';

const TypeBuses = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("https://bcknd.ticket-hub.net/api/admin/bus_types", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bus_type);
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
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/bus_type/delete/${index}`, {
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

  const handleEdit = (id) => {
    const sendData = data.find((item) => item.id === id);
    navigate('/Buses/AddTypeBuses', { state: { sendData } });
  };

  const onchangething = (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    axios.put(`https://bcknd.ticket-hub.net/api/admin/bus_types/status/${id}`, { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUpdate(!update);
      })
      .catch(() => {
      });
  };
  const filteredData = data.filter((item) => {
    if (selectedFilter === "Filter") {
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
  const cheose = ["Filter", "name", "seat_count", "status",
  ]
  const labelMap = {
    Filter: "Filter",
    name: "name",
    seat_count: "seats",
    status: "status",
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
      <NavBuses />
              <ToastContainer />
      

      {/* Search Box */}
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
        <ThreeThing navGo='/Buses/AddTypeBuses' liked
          labelMap={labelMap}
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>

      {/* Data Table */}
      <div className="mt-10 ml-5 hidden lg:block">
      <table className="w-full border-y border-x border-black ">
      <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
            <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">S/N</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Bus Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Seats Count</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Plan Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Seats Image</th>
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
                <td className="w-[143px] h-[56px] text-[16px] px-2">{item?.name??"N//A"}</td>
                <td><img className="w-5 h-5" src={item.bus_image}  /></td>
                <td className="w-[143px] h-[56px] text-[16px]">{item?.seat_count??"N//A"}</td>
                <td><img className="w-5 h-5" src={item.plan_image}  /></td>
                <td><img className="w-5 h-5" src={item.seats_image}  /></td>
                <td className="w-[143px] h-[56px] text-[16px] flex items-center gap-0.5">
                  <div className='flex my-auto'>
                    <StyledWrapper>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item.status === "active"} 
                          onClick={() => onchangething(item.id, item.status)}  
                        />
                        <span className="slider" />
                      </label>
                    </StyledWrapper>
                  </div>
                </td>
                <td className="w-[143px] h-[56px] text-[16px] text-twelve">
                  <span className="font-normal p-2 rounded-[8px] flex">
                    <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                    <img className='w-[24px] h-[24px] ml-2 cursor-pointer' src={delet}
                      onClick={() => handleDelete(item.id, item.name)}
                      alt="delete" />
                  </span>
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
                <strong>agent:</strong>
                <span>{item?.name??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>bus Image:</strong>
                <img
                  className="w-5 h-5"
                  src={item.bus_image === null ? `data:image/png;base64,${item.bus_image}` : item.bus_image}
                />
              </div>

              <div className="flex gap-4">
                <strong>plan image :</strong>
                <img
                  className="w-5 h-5"
                  src={item.plan_image === null ? `data:image/png;base64,${item.plan_image}` : item.plan_image}
                />
              </div>

              <div className="flex gap-4">
                <strong>Seats Image:</strong>
                <img
                  className="w-5 h-5"
                  src={item.seats_image === null ? `data:image/png;base64,${item.seats_image}` : item.seats_image}
                
                />
              </div>

              <div className="flex gap-4">
                <strong>seat_count:</strong>
                <span>{item?.seat_count??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Status:</strong>
                <StyledWrapper>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item.status === "active"} 
                          onClick={() => onchangething(item.id, item.status)}  
                        />
                        <span className="slider" />
                      </label>
                    </StyledWrapper>              </div>
            
              <div className='flex'>
                <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                <img
                  className='w-[24px] h-[24px] ml-2 cursor-pointer'
                  src={delet}
                  onClick={() => handleDelete(item.id, item.name)}
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

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 31px;
    height: 17px;
  }

  .switch input {
    opacity: 1;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    transition: .4s;
    border-radius: 30px;
    border: 1px solid #ccc;
  }

  /* The slider's circle */
  .slider:before {
    position: absolute;
    content: "";
    height: 1em; /* تقليل حجم الدائرة */
    width: 1em; /* تقليل حجم الدائرة */
    border-radius: 50%; /* يجعلها دائرة */
    left: 1px; /* تحريكها قليلًا لتتناسب مع الحجم الجديد */
    top: 0;
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #5fdd54;
    border: 1px solid transparent;
  }

  input:checked + .slider:before {
    transform: translateX(0.8em); /* تحريك الدائرة عند التبديل */
  }
`;

export default TypeBuses;
