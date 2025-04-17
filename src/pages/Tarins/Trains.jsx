import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; import NavTrains from './NavTrains'
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Trains = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
        const [selectedFilter, setSelectedFilter] = useState(''); 
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('token');

      axios.get("https://bcknd.ticket-hub.net/api/admin/trains", {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })
          .then(response => {
              setData(response.data.train);

          }).catch(() => {
                        toast.error("Error fetching data")
                      });
            
  }, [update])

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

              axios.delete(`https://bcknd.ticket-hub.net/api/admin/train/delete/${index}`, {
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

      navigate('/Train/Addtrains', { state: { sendData } });
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

const cheose = ["Filter","name","agent","route","country",
]
const labelMap = {
Filter: "Filter",
name: "class",
agent:"agent",
route:'route',
country:"country",

};
  return (
    <div>
              <ToastContainer />
      
    <NavTrains />
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
        <ThreeThing navGo='/Train/Addtrains' liked
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
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">Class </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">agent </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">type </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">route </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Class </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">country </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Status </th>
                    <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
            </thead>
            <tbody>

                {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                        <td className="w-[143px] h-[56px]  text-[14px]  px-2">{item?.name??"N//A"}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item?.agent??"N//A"}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item?.type??"N//A"}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item?.route??"N//A"}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item?.class??"N//A"}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item?.country??"N//A"}</td>
    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">
      {item.status===1 ? "active" : "inactive"}
      </span></td>

                        <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                            <img className='w-[24px] h-[24px]' src={pin}
                                onClick={() => handleEdit(item.id)} />
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
     {/* Mobile view */}
    <div className="mt-10 ml-5 lg:hidden">
      <div className='w-[95%] bg-six'>
        {filteredData.map((item, index) => (
          <div key={index} className='flex flex-col gap-4 p-3'>
            <div className="flex gap-4">
              <strong>Class:</strong>
              <span>{item?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>agent:</strong>
              <span>{item?.agent??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>type:</strong>
              <span>{item?.type??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>route:</strong>
              <span>{item?.route??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Class:</strong>
              <span>{item?.name??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>country:</strong>
              <span>{item?.country??"N//A"}</span>
            </div>
            <div className="flex gap-4">
              <strong>Status:</strong>
              <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item?.status??"N//A"}</span>
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
  )
}

export default Trains
