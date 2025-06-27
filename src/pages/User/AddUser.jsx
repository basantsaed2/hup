import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import Inputfiltter from '../../ui/Inputfiltter';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    country: '',
    city: '',
    zone: '',
    email: '',
    password: ''
  });

  const [actions, setActions] = useState([]);
  useEffect(() => {
    const storedPosition = localStorage.getItem("role");
    let roles = [];
    if (storedPosition) {
      try {
        const position = JSON.parse(storedPosition);
        if (position && Array.isArray(position.roles)) {
          roles = position.roles;
        } else {
          console.warn("Position.roles is not an array or missing", position);
        }
      } catch (error) {
        console.error("Error parsing position from localStorage", error);
      }
    } else {
      console.warn("No position found in localStorage");
    }
    const paymentActions = roles
      .filter((role) => role.module === "user")
      .map((role) => role.action);
    setActions(paymentActions);
  }, []);

  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setName(sendData.name);
      setPhone(sendData.phone);
      setCountry(sendData.country_id);
      setCity(sendData.city_id);
      setZone(sendData.zone_id);
      setEmail(sendData.email);
      setEdit(true);
    }

    // تأخير ظهور الصفحة على الأقل ثانية
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'countries') setCountry(value);
    if (name === 'cities') setCity(value);
    if (name === 'zones') setZone(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required';
    if (!phone) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\+?\d+$/.test(phone)) { 
      formErrors.phone = 'Phone should contain only numbers or start with a "+"';
    }
    if (!country) formErrors.country = 'Country is required';
    if (!city) formErrors.city = 'City is required';
    if (!zone) formErrors.zone = 'Zone is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if (!edit && password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }

    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return; 
    }

    const token = localStorage.getItem('token');
    const newUser = {
      name,
      phone,
      country_id: country,
      city_id: city,
      zone_id: zone,
      email,
    };

    if (!edit) {
      newUser.password = password;
    }

    if (edit) {
      
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/user/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('User updated successfully'); 
          setTimeout(() => {
            navigate('/User');
          }, 2000);
        })
    .catch((error) => {
     const errors = error?.response?.data?.message;
   
     // استخراج أول رسالة من أول مفتاح
     if (errors && typeof errors === 'object') {
       const firstKey = Object.keys(errors)[0];
       const firstMessage = errors[firstKey][0];
       toast.error(firstMessage);
     } else {
       toast.error("Something went wrong.");
     }
   });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/user/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('User added successfully'); 
        setTimeout(() => {
          navigate('/User');
        }, 2000);
      })
     .catch((error) => {
      const errors = error?.response?.data?.message;
    
      // استخراج أول رسالة من أول مفتاح
      if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0];
        const firstMessage = errors[firstKey][0];
        toast.error(firstMessage);
      } else {
        toast.error("Something went wrong.");
      }
    });

    setName('');
    setPhone('');
    setCountry('');
    setCity('');
    setZone('');
    setEmail('');
    setPassword('');
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
    <div className="ml-6">
      <AddAll navGo="/User" name={edit?"Edit User":"AddUser"} />
{(actions.includes('add') || actions.includes("edit")) && (
      
<>
   <div className="flex flex-wrap gap-6 mt-6">
        <InputField
          placeholder="User"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
        <InputArrow
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
        <Inputfiltter
          like
          placeholder="zone"
          name="zones"
          value={zone}
          onChange={handleChange}
          shara={city}
          required
        />
        <InputField
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > {edit?"Edit":"Add"}</span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>
               <span className='absolute w-20 h-20 right-45 lg:right-60  bg-three top-0 transform transition rotate-45'></span>


          </button>
      </div>
</>
      )}
   
      <ToastContainer />
    </div>
  );
};

export default AddUser;
