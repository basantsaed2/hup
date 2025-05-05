 import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import SwitchButton from '../../../ui/SwitchButton';
import  FileUploadButton from '../../../ui/FileUploadButton'

const AddBusesHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setname] = useState('')
  const [nametwo, setnametowo] = useState('')
  const [edit, setEdit] = useState(false);
  const [valuee, setValue] = useState("inactive");
  const [icon, seticon] = useState('');
  const [icontwo, seticontwo] = useState('');
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    icon: ''
  });
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = ' Aminit is required';
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setname(value)
  }


  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setnametowo(sendData.name)
      setname(sendData.name);
       setValue(sendData.status);
       setEdit(true);
      if(sendData.icon_link){
          seticon(sendData.icon_link);  
          seticontwo(sendData.icon_link);
    }}
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);


  const handleSave = () => {
    if (!validateForm()) return;

    const newBus = {
      status:valuee,
      icon:icon,
    }
   
    // if (edit && nametwo === name) {
    //   return toast.error('You should change the amenities name');
    // }
    
    newBus.name = name;
    const { sendData } = location.state || {};
    const token = localStorage.getItem('token');

    if (edit ) {

      axios.put(`https://bcknd.ticket-hub.net/api/admin/aminity/update/${sendData.id}`, newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Bus updated successfully:', response.data);
          toast.success('Aminit updated  successfully');

          setTimeout(() => {
            navigate('/Buses/BusesHistory');
          }, 2000);
        })
        .catch(error => {
          const statusCode = error.response.status;
      if (statusCode === 400) {
        toast.error('Aminit already exists');
      }
        });
    
    } else {
      // Add Bus logic
      axios.post('https://bcknd.ticket-hub.net/api/admin/aminity/add', newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Aminit added successfully:', response.data);
          toast.success('Aminit added  successfully');

          setTimeout(() => {
            navigate('/Buses/BusesHistory');
          }, 2000);
        })
        .catch(error => {
          const statusCode = error.response.status;
      if (statusCode === 400) {
        toast.error('Aminit already exists');
      }
        });
    }
    setEdit('')
    setValue('inactive')
    seticon(null)
    setname('')
  };
  const handleFileChange = (file, type) => {
    if (file) {
      if (type === 'icon') seticon(file);

    }
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
      <AddAll navGo='/Buses/BusesHistory' name="Add Aminit " />
      <InputField
        placeholder="Aminites"
        name="name"
        value={name}
        onChange={handleChange}
      />
        <FileUploadButton
                name="icon"
                kind="icon"
                flag={icon}
                onFileChange={handleFileChange}
            />

<SwitchButton value={valuee} setValue={setValue} />

<button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
      <ToastContainer />

    </div>
  )
}

export default AddBusesHistory
