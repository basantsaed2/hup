import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const Hiace = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState(''); 
    const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get("https://bcknd.ticket-hub.net/api/admin/hiaces", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.hiaces);
      })
      .catch(() => {
              toast.error("Error fetching data")
            });
  }, [update]);

  const handleDelete = (index, busNumber) => {
    Swal.fire({
      title: `Are you sure you want to delete bus ${busNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/bus/delete/${index}`, {
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
    navigate('/Addhiace', { state: { sendData } });
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
const cheose = ["Filter","agent_name", "agent_email", "capacity","status",
]
  const labelMap = {
    Filter: "Filter",
    agent_name: "agent",
    agent_email: "email",
    capacity: "capacity",
    status: "status",
  };

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
        <ThreeThing navGo='/Addhiace' liked
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
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">agent </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">email</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Capacity</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left"> Hiace Number </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Hiace Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[200px] h-[56px] text-[16px] border-b text-left">Amenities</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                <td className="w-[140px] h-[56px] text-[16px] px-2">{item?.agent_name??"N//A"}</td>
                <td className="w-[140px] h-[56px] text-[12px]">{item?.agent_email??"N//A"}</td>
                <td className="w-[140px] h-[56px] text-[16px]">{item?.capacity??"N//A"}</td>
                <td className="w-[140px] h-[56px] text-[12px]">{item?.bus_number??"N//A"}</td>
                <td><img className="w-5 h-5" src={item.bus_image === null ? `data:image/png;base64,${item.bus_image}` : item.bus_image} alt="Bus" /></td>
                <td className="w-[140px] h-[56px] text-[16px] text-nine">
                  <span className="bg-eight font-normal p-2 rounded-[8px]">{item?.status??"N//A"}</span>
                </td>
                <td className="w-[200px] h-[56px] text-[10px]">
                  {item.amenities && item.amenities.length > 0
                    ? item.amenities.map((amenity, index) => (
                      <span className='text-[10px]' key={index}>{amenity.name}{index < item.amenities.length - 1 && '-'}</span>
                    ))
                    : 'No amenities'}
                </td>
                <td className="w-[140px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id, item.bus_number)}
                    alt="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  */}
      <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
              <div className="flex gap-4">
                <strong>agent:</strong>
                <span>{item?.agent_name??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>email:</strong>
                <span>{item?.agent_email??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Capacity:</strong>
                <span>{item?.capacity??"N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Hiace Number:</strong>
                <span>{item?.bus_number??"N//A"}</span>
              </div>
              <div className="flex gap-4">
          <strong>Hiace Image:</strong>
          <img 
            className="w-5 h-5"
            src={item.bus_image === null ? `data:image/png;base64,${item.bus_image}` : item.bus_image}
            alt={`${item.agent_name} flag`} 
          />
        </div>
              
              <div className="flex gap-4">
                <strong>Status:</strong>
                <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item?.status??"N//A"}</span>
              </div>
              <div className="flex gap-2">
                  {item.amenities && item.amenities.length > 0
                    ? item.amenities.map((amenity, index) => (
                      <span className='text-[10px]' key={index}>{amenity.name}{index < item.amenities.length - 1 && '-'}</span>
                    ))
                    : 'No amenities'}
                </div>
             
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
      
    </div>
  );
};

export default Hiace;
