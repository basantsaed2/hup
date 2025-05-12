import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddAll from '../../ui/AddAll'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddCommission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [train, settrain] = useState('');
  const [bus, setbus] = useState('');
  const [hiace, sethiace] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
      const [edit, setEdit] = useState(false);
  
  const [errors, setErrors] = useState({
    train: '',
    bus: '',
    hiace: ''
  })
  useEffect(() => {

    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission ", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        settrain(response.data.default_commission.train);
        setbus(response.data.default_commission.bus);
        sethiace(response.data.default_commission.hiace);
        setId(response.data.default_commission.id);
          setEdit(true);

      })
      .catch(() => {
        setIsLoading(true)
      });
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
  
      return () => clearTimeout(timeout);

  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'train') settrain(value);
    if (name === 'bus') setbus(value);
    if (name === 'hiace') sethiace(value);
  };


  const validateForm = () => {
    let formErrors = {};

    if (!train) formErrors.name = 'train is required';
    if (!bus) formErrors.name = 'bus is required';
    if (!hiace) formErrors.name = 'hiace is required';


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
      train,
      bus,
      hiace
    };
    if (isLoading) {
      axios.post(`https://bcknd.ticket-hub.net/api/admin/CommissionDefault/add`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Commission updated successfully');
          setTimeout(() => {
            navigate('/Commission');
          }, 2000);
        })
        .catch(() => {
        });
      } else {

    axios.put(`https://bcknd.ticket-hub.net/api/admin/defaultCommission/update/${id}`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Commission updated successfully');
        setTimeout(() => {
          navigate('/Commission');
        }, 2000);
      })
      .catch(() => {
      });
      }
    settrain('');
    sethiace('');
    setbus('');

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

      <AddAll navGo='/Commission' name={edit?"Edit Commission":" Add Commission"} />
      <div className='flex flex-wrap gap-6  mt-6'>

        <InputField name="train" placeholder="train" value={train}
          onChange={handleChange} />
        <InputField name="bus" placeholder="bus" value={bus}
          onChange={handleChange} />
        <InputField name="hiace" placeholder="hiace" value={hiace}
          onChange={handleChange} />
      </div>

      <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'>{edit?"Eidt":"Add"}</span>
               <span className='absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45'></span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>


          </button>
      </div>         <ToastContainer />

    </div>
  )
}

export default AddCommission
