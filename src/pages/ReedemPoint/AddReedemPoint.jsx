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
const AddReedemPoint = () => {
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
            console.log(sendData)
            if (sendData) {
              Setpoints(sendData.points);
              Setcurrency_id(sendData.currency_id);
              Setcurrencies(sendData.currencies);
              setEdit(true);
            }  
            const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location.state]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'points') Setpoints(value);
    if (name === 'currencies') Setcurrencies(value);
    if (name === 'point') Setcurrency_id(value);
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
    if (!currency_id) formErrors.city = 'currency is required';
    
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
          toast.success('Reedem Point updated successfully'); 
          setTimeout(() => {
            navigate('/ReedemPoint');
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
        toast.success('Reedem Point added successfully'); 
        setTimeout(() => {
          navigate('/ReedemPoint');
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
  <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/ReedemPoint' name={edit?"Edit Point":"Add Point"} />
      <div className='flex flex-wrap gap-6  mt-6'>
        <InputField 
        placeholder="points"
          name="points"
          value={points}
          onChange={handleChange}
          required 
          email='number'
          />
        <InputField 
        placeholder="currencies"
          name="currencies"
          value={currencies}
          onChange={handleChange}
          required 
          email='number'
          />
          {!edit&&(
  <InputArrow
          placeholder="currency"
          name="point"
          value={currency_id}
          onChange={handleChange}
          required
        />
          )}
            
      </div>


        <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > {edit?"Edit":"Add"}</span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>
               <span className='absolute w-20 h-20 right-45 lg:right-60 bg-three top-0 transform transition rotate-45'></span>


          </button>
      </div>
      <ToastContainer />

    </div>  )
}

export default AddReedemPoint