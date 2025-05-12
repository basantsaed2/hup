import AddAll from '../../../ui/AddAll'
import picdone from '../../../assets/picdone.svg'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import FileUploadButton from '../../../ui/FileUploadButton'
import axios from 'axios';
import SwitchButton from '../../../ui/SwitchButton';


const AddTypeBuses = () => {
  const [busImage, setBusImage] = useState(null);
  const [planImage, setPlanImage] = useState(null);
  const [seatsImage, setSeatsImage] = useState(null);
  const [busImageor, setBusImageor] = useState(null);
  const [planImageor, setPlanImageor] = useState(null);
  const [seatsImageor, setSeatsImageor] = useState(null);

  const [name, setName] = useState('');
  const [Count, setCount] = useState('');
  const [valuee, setValue] = useState("inactive");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({
    name: '',
    Count: '',
  });



  const handleFileChange = (file, type) => {
    if (file) {
      if (type === 'busImage') setBusImage(file);
      if (type === 'planImage') setPlanImage(file);
      if (type === 'seatsImage') setSeatsImage(file);
    }
  };
  useEffect(() => {
    const { sendData } = location?.state || {};
    if (sendData) {
      setCount(sendData.seat_count);
      setName(sendData.name);
      setValue(sendData.status);
      setEdit(true);
      if (sendData.bus_image) {

        setBusImage(sendData.bus_image);
        setBusImageor(sendData.bus_image);
      }
      if (sendData.plan_image) {
        setPlanImage(sendData.plan_image);
        setPlanImageor(sendData.plan_image);
      }
  
  
  
      if (sendData.seats_image) {
        setSeatsImage(sendData.seats_image);
        setSeatsImageor(sendData.seats_image);
  
  
      }
    }

   

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'Count') setCount(value);

  };

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'name is required';
    if (!Count) formErrors.Count = 'Count is required';
    if (!busImage && !edit) formErrors.busImage = 'busImage is required';
    if (!planImage && !edit) formErrors.planImage = 'planImage is required';
    if (!seatsImage && !edit) formErrors.seatsImage = 'seatsImage is required';

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const token = localStorage.getItem('token');

    const newUser = {
      name: name,
      seat_count: Count,
      status: valuee,
    };

    if (busImage != busImageor) {
      newUser.bus_image = busImage
    }

    if (planImage != planImageor) {
      newUser.plan_image = planImage
    }

    if (seatsImage != seatsImageor) {
      newUser.seats_image = seatsImage
    }

    console.log("Data to be sent:", newUser);

    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/bus_type/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('TypeBuses updated successfully:', response.data);
          toast.success('TypeBuses updated  successfully');

          setTimeout(() => {
            navigate('/Buses/TypeBuses');
          }, 2000);
          resetForm();

        })
        .catch(error => {
          console.error('Error updating country:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/bus_type/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('TypeBuses added  successfully');

        setTimeout(() => {
          navigate('/Buses/TypeBuses');
        }, 2000); resetForm();

      })
      .catch(error => {
        console.error('Error adding country:', error);
      });
    setValue('inactive')
    setName('');
    setCount('');
    setBusImage(null);
    setPlanImage(null);
    setSeatsImage(null);
    setEdit(false);
  };
  const resetForm = () => {
    setBusImage(null);
    setPlanImage(null);
    setSeatsImage(null);
    setBusImageor(null);
    setPlanImageor(null);
    setSeatsImageor(null);
    setName('');
    setCount('');
    setValue('inactive')
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
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Buses/TypeBuses' name={edit?"Edit Type Buses ":"Add Type Buses "} />
      <div className='flex flex-wrap gap-6'>

        <InputField
          placeholder=" Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputField
          placeholder="seat count"
          name="Count"
          value={Count}
          onChange={handleChange}
        />
        <div className='flex items-end justify-center'>

          <FileUploadButton
            name="busImage"
            kind="busImage"
            flag={busImage}
            onFileChange={handleFileChange}
          />
        </div>
        <FileUploadButton
          name="planImage"
          kind="planImage"
          flag={planImage}
          onFileChange={handleFileChange}
        />
        <FileUploadButton
          name="seatsImage"
          flag={seatsImage}
          onFileChange={handleFileChange}
          kind="seatsImage"
        />

        <SwitchButton value={valuee} setValue={setValue} />


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
  )
}

export default AddTypeBuses;
