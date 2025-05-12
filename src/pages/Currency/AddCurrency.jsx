import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AddAll from '../../ui/AddAll'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
import SwitchButton from '../../ui/SwitchButton';

const AddCurrency = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(false);
  const [status, setstatus] = useState("0");
  const [symbol, setsymbol] = useState('');
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [errors, setErrors] = useState({
    symbol: "",
    name: '',
    status: '',
  });
  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setsymbol(sendData.symbol);
      setName(sendData.name);
      setstatus(sendData.status);
      setEdit(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'symbol') setsymbol(value);
    if (name === 'name') setName(value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!symbol) formErrors.symbol = 'symbol is required';
    if (!name) formErrors.name = 'name is required';
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
      symbol: symbol,
      status: status,

    };

    console.log("Data to be sent:", newUser);

    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/currency/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Currency updated successfully');
          setTimeout(() => {
            navigate('/Currency');
          }, 2000);
        })
        .catch(error => {
          console.error('Error updating country:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/currency/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Currency added successfully');

        setTimeout(() => {
          navigate('/Currency');
        }, 2000);
      })
      .catch(() => {
      });


    setsymbol('');
    setName('');
    setstatus('')
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

      <AddAll navGo='/Currency' name={edit?"Edit Currency":"Add Currency"} />
      <div className='flex flex-col gap-6  mt-6'>
        <InputField placeholder="Currency"
          name="name"
          value={name}
          onChange={handleChange}
          required />
        <InputField placeholder="symbol"
          name="symbol"
          value={symbol}
          onChange={handleChange}
          required />

        <SwitchButton value={status} num title="stutes" setValue={setstatus} />
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

export default AddCurrency
