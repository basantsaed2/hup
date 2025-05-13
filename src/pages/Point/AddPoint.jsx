import React, { useEffect, useState } from 'react';
import picdone from '../../assets/picdone.svg';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import Inputfiltter from '../../ui/Inputfiltter';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const AddPoint = () => {
     const navigate = useNavigate();
      const location = useLocation();
     const [currency_id, Setcurrency_id] = useState('');
      const [points, Setpoints] = useState('');
      const [currencies, Setcurrencies] = useState('');
      const [edit, setEdit] = useState(false);
      const [loading, setLoading] = useState(true);  
        const [errors, setErrors] = useState({
          currency_id: '',
          points: '',
          currencies: '',       
        });
          useEffect(() => {
            const { sendData } = location.state || {};
            if (sendData) {
              currency_id(sendData.country_id);
              points(sendData.points);
              currencies(sendData.currencies);
              setEdit(true);
            }  const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location.state]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'points') Setpoints(value);
    if (name === 'currencies') Setcurrencies(value);
    if (name === 'currency_id') Setcurrency_id(value);
  };


 const validateForm = () => {
    let formErrors = {};

    if (!points) {
      formErrors.points = 'points is required';
    } else if (!/^\+?\d+$/.test(points)) { 
      formErrors.points = 'points should contain only numbers ';
    }
    if (!currencies) {
      formErrors.currencies = 'currencies is required';
    } else if (!/^\+?\d+$/.test(currencies)) { 
      formErrors.currencies = 'currencies should contain only numbers "';
    }
    if (!currency_id) formErrors.city = 'City is required';
    
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
      currency_id,
      points,
      currencies
     
    };


    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/point/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('point updated successfully'); 
          setTimeout(() => {
            navigate('/User');
          }, 2000);
        })
        .catch(() => {
          toast.error("Failed network");
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/point/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('point added successfully'); 
        setTimeout(() => {
          navigate('/User');
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed network");
      });
  Setpoints('');
   Setcurrencies('');
     Setcurrency_id('');
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
    <div>AddPoint</div>
  )
}

export default AddPoint