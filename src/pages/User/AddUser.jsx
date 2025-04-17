import React, { useEffect, useState } from 'react';
import picdone from '../../assets/picdone.svg';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Inputfiltter from '../../ui/Inputfiltter';

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
          }, 3000);
        })
        .catch(() => {
          toast.error("Failed network");
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
        }, 3000);
      })
      .catch(() => {
        toast.error("Failed network");
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
      <AddAll navGo="/User" name="Add User" />
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
        <button onClick={handleSave}>
          <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
