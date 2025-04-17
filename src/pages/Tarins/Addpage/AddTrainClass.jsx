import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddTrainClass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
      const [loading, setLoading] = useState(true);
    
    const [errors, setErrors] = useState({
        name: '',
    });
    useEffect(() => {
        const { sendData } = location.state || {};
        if (sendData) {
            setName(sendData.name);
            setEdit(true);

        }
        const timeout = setTimeout(() => {
            setLoading(false);
          }, 1000);
      
          return () => clearTimeout(timeout);
    } , [location.state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
    };
    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.country = 'name is required';
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
        const newCountryData = {
            name: name,
        }

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { sendData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/trainclass/update/${sendData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    toast.success('Class updated successfully');
                    setTimeout(() => {
                        navigate('/Train/TrainClass');
                    }, 3000);
                })
                .catch(() => {
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/trainclass/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                toast.success('Class added  successfully');

                setTimeout(() => {
                    navigate('/Train/TrainClass');
                }, 3000);
            })
            .catch(() => {
            });

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
            <AddAll navGo='/Train/TrainClass' name="Add  train type  " />
            <InputField
                placeholder="Class Name"
                name="name"
                value={name}
                onChange={handleChange}
            />

           <button onClick={handleSave}>
                       <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
                       </button>
            <ToastContainer />
        </div>
    )
}

export default AddTrainClass
