import React, {  useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputArrow from '../../../ui/InputArrow'
import InputField from '../../../ui/InputField'
import Inputfiltter from '../../../ui/Inputfiltter'
import SwitchButton from '../../../ui/SwitchButton';

const Addzones= () => {
      const navigate = useNavigate();
      const location = useLocation();
      const [country, setCountry] = useState('');
      const [city, setCity] = useState('');
      const [name, setName] = useState('');
      const [valuee, setValue] = useState("inactive");
      const [edit, setEdit] = useState(false);
        const [loading, setLoading] = useState(true);
      
      const [errors, setErrors] = useState({
        country: '',
        city:"",
        name: '',
      });


 useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setCountry(sendData.country_id);
      setCity(sendData.city_id);
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
    if (name === 'zones')setName(value);
    if (name === 'cities')setCity(value);
  };

  const validateForm = () => {
      let formErrors = {};
      if (!country) formErrors.country = 'Country is required';
      if (!name) formErrors.name = 'name is required';
      if (!city) formErrors.city = 'city is required';
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
        country_id: country,
        city_id: city,
        status: valuee,
      };
  
      console.log("Data to be sent:", newUser);
  
      if (edit) {
        const { sendData } = location.state || {};
        axios.put(`https://bcknd.ticket-hub.net/api/admin/zone/update/${sendData.id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
             toast.success('zone added  successfully'); 
                  
                    setTimeout(() => {
                      navigate('/Location/Zones');
                    }, 2000);
          })
          .catch(() => {
          });
        return;
      }
  
      axios.post('https://bcknd.ticket-hub.net/api/admin/zone/add', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
           toast.success('zone added  successfully'); 
                
                  setTimeout(() => {
                    navigate('/Location/Zones');
                  }, 2000);
        })
        .catch(() => {
        });
  
      setCountry('');
      setName('');
      setCity('');
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
    <AddAll navGo='/Location/Zones' name={edit?"Edit Zone":"Add Zone"} />
    <InputArrow like
      placeholder="Country"
      name="countries"
      value={country}
      onChange={handleChange}
      required
    />
  <Inputfiltter
  like
  placeholder="city"
  name="cities"
  value={city}
  onChange={handleChange}
  shara={country}
  required
/>
    
    <InputField
      placeholder="zones"
      name="zones"
      value={name}
      onChange={handleChange}
      required
    />
  
    <SwitchButton value={valuee} setValue={setValue} />
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

export default Addzones
