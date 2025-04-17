  import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing';
import NavLocation from './NavLocation';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Tiglebutton from '../../ui/Tiglebutton';
import { CiSearch } from 'react-icons/ci'; // Import the search icon for the search field
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Stations = () => {
  const [data, setData] = useState([]);
  const [datatwo, setDatatwo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [action, setAction] = useState(() => localStorage.getItem('action') || 'on');
 const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState(''); 
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://bcknd.ticket-hub.net/api/admin/stations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setData(response.data.pickup);
        setDatatwo(response.data.dropoff);
      })
        .catch(() => {
                toast.error("Error fetching data")
              });
  }, [update]);

  const handleDelete = (index) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://bcknd.ticket-hub.net/api/admin/station/delete/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setUpdate(!update);
      })
      .catch(() => {
      });
  };

  const handleEdit = (index) => {
    if (action === 'on') {
      const sendData = datatwo.find((item) => item.id === index);
      navigate('/Location/AddOffStation', { state: { sendData } });
    } else {
      const sendData = data.find((item) => item.id === index);
      navigate('/Location/AddOffStation', { state: { sendData } });
    }
  };

  const handleToggle = (newAction) => {
    setAction(newAction);
    localStorage.setItem('action', newAction);
  };

 
const cheose = ["Filter","name", "country_name","city_name", "zone_name"]
  const labelMap = {
    Filter: "Filter",
    name: " name",
    country_name: "country",
    city_name:" city",
    zone_name:"  zone"
  };

 const renderTable = (items) => {
  const filtered = items.filter((item) => {
    const query = searchQuery.toLowerCase();

    if (selectedFilter === "Filter" || selectedFilter === "") {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(query)
      );
    }

    if (item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(query);
    }

    return false;
  });

  return (
    <>
            <ToastContainer />

    <div className="mt-10 ml-5 hidden lg:block">
      <table className="w-full  border-y border-x border-black">
        <thead className="w-full">
          <tr className='bg-four w-[1012px] h-[56px]'>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">Name</th>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Country</th>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left">City</th>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Zone</th>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
            <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
              <td className="w-[143px] h-[56px] text-[16px] px-4">{item?.name??"N//A"}</td>
              <td className="w-[143px] h-[56px] text-[16px] ">{item?.country_name??"N//A"}</td>
              <td className="w-[143px] h-[56px] text-[16px] ">{item?.city_name??"N//A"}</td>
              <td className="w-[143px] h-[56px] text-[16px] ">{item?.zone_name??"N//A"}</td>
              <td className="w-[143px] h-[56px] text-[16px] ">{item?.status??"N//A"}</td>
              <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-5 items-center">
                <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                <img className='w-[24px] h-[24px] ml-2 cursor-pointer' src={delet} onClick={() => handleDelete(item.id)} alt="delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        <div className="mt-10 ml-5 lg:hidden">
            <div className='w-[95%] bg-six'>
              {filtered.map((item, index) => (
                <div key={index} className='flex flex-col gap-4 p-3'>
                  <div className="flex gap-4">
                    <strong>name:</strong>
                    <span>{item?.name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>Country:</strong>
                    <span>{item?.country_name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>city:</strong>
                    <span>{item?.name??"N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>Zone:</strong>
                    <span>{item?.zone_name??"N//A"}</span>
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
          </>

  );
};

  return (
    <div>
      <NavLocation />
      <div className='flex mx-2 mt-6 gap-3'>
        <Tiglebutton action={action === 'on' ? 'on' : 'off'} onClick={() => handleToggle('on')} title='Pick-up' />
        <Tiglebutton action={action === 'on' ? 'off' : 'on'} onClick={() => handleToggle('off')} title='Drop-off' />
      </div>
      {/* Search Bar */}
      <div className='flex justify-between items-center gap-3 relative mt-6 px-5'>
        
        <input
          placeholder='Search'
          className=' h-10 lg:h-[48px] w-25 border-2 border-two rounded-[8px] pl-10'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-6 md:h-6' />
      <ThreeThing navGo='/Location/AddOffStation' liked 
       labelMap={labelMap}
       cheose={cheose} // Pass the cheose array to ThreeThing component
       selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
       setSelectedFilter={setSelectedFilter}/>
      </div>


      {action === 'on' ? renderTable(datatwo) : renderTable(data)}
    </div>
  );
};

export default Stations;
