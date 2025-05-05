import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow';
import SwitchButton from '../../../ui/SwitchButton';

const AddCities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [valuee, setValue] = useState("inactive");
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    country: '',
    name: '',
  });

  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setCountry(sendData.country_id);
      setName(sendData.name);
      setValue(sendData.status);
      setEdit(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setCountry(value);
    if (name === 'name')setName(value);
  };
  
  const validateForm = () => {
    let formErrors = {};
    if (!country) formErrors.country = 'Country is required';
    if (!name) formErrors.flag = 'name is required';
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
      console.log(error);
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
      country_id:country,
      status:valuee,
    };


    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/city/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('city updated successfully'); 
                    setTimeout(() => {
                      navigate('/Location/Cities');
                    }, 2000);
        })
        .catch((error) => {
          console.log("2 2 2");
          console.log(error);

        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/city/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
                toast.success('city added  successfully'); 
              
                setTimeout(() => {
                  navigate('/Location/Cities');
                }, 2000);
      })
      .catch(() => {
      });

    setCountry('');
    setName('');
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
      <AddAll navGo='/Location/Cities' name="Add Citiy" />
      <InputArrow like
        placeholder="Country"
        name="countries"
        value={country}
        onChange={handleChange}
        required
      />
      
      <InputField
        placeholder="city"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />
    
      <SwitchButton value={valuee} setValue={setValue} />
      <button onClick={handleSave}>
      <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
      </button>
      <ToastContainer />
    </div>
  )
}

export default AddCities
