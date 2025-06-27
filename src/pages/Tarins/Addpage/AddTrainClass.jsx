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
          .filter((role) => role.module === "trainclasses")
          .map((role) => role.action);
        setActions(paymentActions);
      }, []);
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
                    }, 2000);
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
                }, 2000);
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
            <AddAll navGo='/Train/TrainClass' name={edit?"Edit  train Class":"Add  train Class"} />
        {(actions.includes('add') || actions.includes("edit")) && (
<>
            <InputField
                placeholder="Class Name"
                name="name"
                value={name}
                onChange={handleChange}
            />

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
    )
}

export default AddTrainClass
