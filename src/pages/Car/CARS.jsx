import React, { useEffect, useState } from 'react';
import Navcars from './Navcars'
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing.jsx';
import { CiSearch } from "react-icons/ci";
import { ToastContainer,toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const CARS = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
      const [selectedFilter, setSelectedFilter] = useState(''); 
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data);

      })
   .catch(() => {
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
      
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/car/delete/${index}`, {
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
    
    navigate('/Car/AddCARS', { state: { sendData } });
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
const cheose = ["Filter","model_name", "category_name","brand_name","agent_name"
  ,"car_number","car_color","status","car_year"
]
const labelMap = {
  Filter: "Filter",
  model_name: "model",
  category_name: "category",
  brand_name: "brand",
  agent_name: "agent",
  car_number: "number",
  car_color: "color",
  car_year: "year",
  status: "status",

};
  return (
    <div>
              <ToastContainer />

      <Navcars/>
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
          navGo='/Car/AddCARS' 
          liked 
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
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3"> model</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> category</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">brand</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">agent</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">car number</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">car color</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">year</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">status</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                <td className="flex gap-1 px-2 ">
                  <img  className="w-5 h-5"src={item.image===null?`data:image/png;base64,${item.image}`:item.image}/>
                  <span className='w-[143px] h-[56px]  text-[16px]'>{item?.model_name??"N//A"}</span>
                  </td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item?.category_name??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item?.brand_name??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item?.agent_name??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item?.car_number??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item?.car_color??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[10px]">{item?.car_year??"N//A"}</td>
                <td className="w-[143px]  h-[56px]  text-[12px]">{item.status}</td>
                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin}
                    onClick={() => handleEdit(item.id)} />
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id,item.model_name)}   
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
                    <strong>model:</strong>
                    <span>{item?.model_name??"N//A"}</span>
                  </div>
                
                  <div className="flex gap-4">
                    <strong>image:</strong>
                    <img 
                      className="w-5 h-5"
                      src={item.image === null ? `data:image/png;base64,${item.image}` : item.image}
                    />
                  </div>
                  <div className="flex gap-4">
                    <strong>category:</strong>
                    <span>{item?.category_name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>brand:</strong>
                    <span>{item?.brand_name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>agent:</strong>
                    <span>{item?.agent_name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>car number:</strong>
                    <span>{item?.car_number??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>car color:</strong>
                    <span>{item?.car_color??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>year:</strong>
                    <span>{item?.car_year??"N//A"}</span>
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

export default CARS
