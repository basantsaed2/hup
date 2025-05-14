import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow';
import Inputfiltter from '../../../ui/Inputfiltter';
const AddTrainRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [fromcountry, setfromcountry] = useState('');
  const [tocountry, settocountry] = useState('');
  const [fromcity, setfromcity] = useState('');
  const [tocity, settocity] = useState('');
  const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    name: '',
    fromcountry: '',
    tocountry: '',
    fromcity: '',
    tocity: '',
  });
  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setName(sendData.name);
      setfromcountry(sendData.from_country_id);
      settocountry(sendData.to_country_id);
      setfromcity(sendData.from_city_id);
      settocity(sendData.to_city_id);
      setEdit(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }
    , [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'countries') setfromcountry(value);
    if (name === 'cities') setfromcity(value);
  };
  const handleChangeywo = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') settocountry(value);
    if (name === 'cities') settocity(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!fromcountry) formErrors.country = 'from country is required';
    if (!name) formErrors.name = 'name is required';
    if (!fromcity) formErrors.city = 'from city is required';
    if (!tocountry) formErrors.city = 'to country  is required';
    if (!tocity) formErrors.city = 'to city is required';
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
      from_country_id: fromcountry,
      from_city_id: fromcity,
      to_country_id: tocountry,
      to_city_id: tocity,
    };

    console.log("Data to be sent:", newUser);

    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/trainRoute/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Route added  successfully');

          setTimeout(() => {
            navigate('/Train/TrainRoute');
          }, 2000);
        })
        .catch(() => {
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/trainRoute/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Route added  successfully');

        setTimeout(() => {
          navigate('/Train/TrainRoute');
        }, 2000);
      })
      .catch(() => {
      });

    setfromcity('');
    setName('');
    setfromcountry('');
    settocity('');
    settocountry('');
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
      <AddAll navGo='/Train/TrainRoute' name={edit?"Edit train Route ":"Add train Route "} />
      <div className='flex flex-wrap  gap-6 mt-6'>
        <InputField
          placeholder="Route Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputArrow
          placeholder=" from Country"
          name="countries"
          value={fromcountry}
          onChange={handleChange}
          tik
          required
        />
        <Inputfiltter
          like
          placeholder=" from city"
          name="cities"
          value={fromcity}
          onChange={handleChange}
          shara={fromcountry}
          tik
          required
        />
        <InputArrow
          placeholder=" to Country"
          name="countries"
          value={tocountry}
          onChange={handleChangeywo}
          tik
          required
        />
        <Inputfiltter
          like
          placeholder="to city"
          name="cities"
          value={tocity}
          onChange={handleChangeywo}
          shara={tocountry}
          tik
          required
        />
      </div>

   <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > {edit?"Edit":"Add"}</span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>
               <span className='absolute w-20 h-20 right-45 lg:right-60 bg-three top-0 transform transition rotate-45'></span>


          </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTrainRoute
