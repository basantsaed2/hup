import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll.jsx';
import picdone from '../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../ui/InputField.jsx';
import FileUploadButton from '../../ui/FileUploadButton.jsx';
import SwitchButton from '../../ui/SwitchButton.jsx';
import Inputfiltter from '../../ui/Inputfiltter.jsx';
import Aminites from '../../ui/amintes.jsx'; // Import the Aminites component for amenities selection


const MinivanAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [busNumber, setBusNumber] = useState('');
  // const [busType, setBusType] = useState('');
  // const [capacity, setCapacity] = useState('');
  const [agent, setAgent] = useState('');
  const [pic, setPic] = useState(null);
  const [originalFlag, setOriginalFlag] = useState(null);
  const [status, setStatus] = useState('inactive');
  const [edit, setEdit] = useState(false);
      const [selectedDays, setSelectedDays] = useState([]);
  
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    busNumber: '',
    pic: '',
    // busType: '',
    capacity: '',
    agent: "",
    type: "",
  });

  const handleFileChange = (file) => {
    if (file) {
      setPic(file);
    }
  };

  // Handling form validation
  const validateForm = () => {
    let formErrors = {};
    if (!busNumber) formErrors.busNumber = 'Bus number is required';
    if (!pic && !edit) formErrors.pic = 'Bus image is required';
    // if (!capacity) formErrors.capacity = 'Capacity is required or should write number';
    // if (!busType) formErrors.busType = 'Bus type is required';
    if (!agent) formErrors.agent = 'Agent type is required';

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'busNumber') setBusNumber(value);
    // if (name === 'bus_types') setBusType(value);
    if (name === 'agents') setAgent(value);
    // if (name === 'capacity') {
    //   // if (/^\d*$/.test(value)) {
    //   //   setCapacity(value);
    //   // }
    // } else {
    //   if (name === 'busNumber') setBusNumber(value);
    //   // if (name === 'bus_types') setBusType(value);
    //   if (name === 'agents') setAgent(value);
    // }
  };


  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setBusNumber(sendData.bus_number);
      setPic(sendData.bus_image);
      // setCapacity(sendData.capacity);
      setStatus(sendData.status);
      setAgent(sendData.agent_id);
      setEdit(true);
      if (sendData.bus_image) {
            setPic(sendData.bus_image);
            setOriginalFlag(sendData.bus_image);
      }
    
      setSelectedDays(() => {
        const selected = sendData.amenities?.map(item => item.id);
  setSelectedDays(() => {
    const combined =selected
    return Array.from(new Set(combined));
  });
      });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleSave = () => {
    if (!validateForm()) return;

    const newBus = {
      type: "hiace",
      bus_number: busNumber,
      bus_type_id:null,
      agent_id: agent,
      capacity: "14",
      status: status,
      aminty_id:selectedDays

    };

    if (pic != originalFlag) {
      newBus.bus_image = pic
    }


    const { sendData } = location.state || {};
    const token = localStorage.getItem('token');

    if (edit && sendData) {
      // Update Bus logic
      axios.put(`https://bcknd.ticket-hub.net/api/admin/bus/update/${sendData.id}`, newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Mini van updated  successfully');

          setTimeout(() => {
            navigate('/Minivan');
          }, 2000);
          resetForm();
        })
        .catch(() => {
        });
    } else {
      // Add Bus logic
      axios.post('https://bcknd.ticket-hub.net/api/admin/bus/add', newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Mini van added  successfully');

          setTimeout(() => {
            navigate('/Minivan');
          }, 2000);
          resetForm();
        })
        .catch(() => {
        });
    }
  };

  const resetForm = () => {
    setAgent('');
    setSelectedDays([]);
    setOriginalFlag(null);
    setBusNumber('');
    // setBusType('');
    // setCapacity('');
    setPic(null);
    setStatus('inactive');
    setEdit(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }

  return (
<div className='ml-6'>

      <AddAll navGo='/Minivan' name="Add Mini van" />
      <div className=' flex flex-wrap mt-6 gap-6'>

        <InputField
          placeholder="Mini van Number"
          name="busNumber"
          value={busNumber}
          onChange={handleChange}
        />
        {/* <Inputfiltter
          like
          placeholder="hiace Type"
          name="bus_types"
          value={busType}
          onChange={handleChange}
          required
        /> */}
        <Inputfiltter
          like
          placeholder="Agents"
          name="agents"
          value={agent}
          onChange={handleChange}
          required
        />
{/*       
        <InputField
          email='number'
          placeholder="Capacity"
          name="capacity"
          value={capacity}
          onChange={handleChange}
        /> */}
                <div className='flex items-end justify-center'>

        <FileUploadButton
          name="busImage"
          kind="Hiace Image"
          flag={pic}
          onFileChange={handleFileChange}
        />
        </div>
        <div className='flex items-end justify-center'>

<Aminites selectedDays={selectedDays} setSelectedDays={setSelectedDays} />

</div>
        <SwitchButton value={status} title='status' setValue={setStatus} />
      </div>
    <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > {edit?"Eidt":"Add"}</span>
               <span className='absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45'></span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>


          </button>
      </div>
                <ToastContainer />

      </div>

  );
};

export default MinivanAdd ;
