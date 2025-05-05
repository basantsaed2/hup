
import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddFees = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [train, settrain] = useState('');
    const [bus, setbus] = useState('');
    const [hiacs, sethiacs] = useState('');
    const [Private, setPrivate] = useState('');
    const [edit, setEdit] = useState(false);
     const [loading, setLoading] = useState(true);
   

    const [errors, setErrors] = useState({
      train: '',
      bus: '',
      hiacs: '',
      Private: '',
    });

  
    useEffect(() => {
        const { sendData } = location.state || {};
        if (sendData) {
          settrain(Number(sendData.train_fees).toFixed(2));
          setbus(Number(sendData.bus_fees).toFixed(2));
          sethiacs(Number(sendData.hiace_fees).toFixed(2));
          setPrivate(Number(sendData.private_request_fees).toFixed(2));
            

            setEdit(true);
        }
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 1000);
    
        return () => clearTimeout(timeout);
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'train') settrain(value);
        if (name === 'bus') setbus(value);
        if (name === 'hiace') sethiacs(value);
        if (name === 'Private') setPrivate(value);
    };

    const validateForm = () => {
      let formErrors = {};
    
      const validateField = (value, fieldName, label) => {
        if (value === '') {
          formErrors[fieldName] = `${label} is required`;
        } else if (isNaN(value)) {
          formErrors[fieldName] = `${label} must be a number`;
        } else if (Number(value) < 0) {
          formErrors[fieldName] = `${label} must not be a negative number`;
        } else {
          let valueStr = value.toString();
          if (valueStr.startsWith('.')) {
            valueStr = '0' + valueStr;
          }
    
          if (!valueStr.includes('.')) {
            formErrors[fieldName] = `${label} must be a decimal number`;
          } else {
            const decimalPart = valueStr.split('.')[1];
            if (decimalPart.length > 2) {
              formErrors[fieldName] = `${label} must have at most 2 decimal places`;
            }
          }
        }
      };
    
      // Run validations for each field
      validateField(train, 'train', 'Train');
      validateField(bus, 'bus', 'Bus');
      validateField(Private, 'Private', 'Private');
      validateField(hiacs, 'hiacs', 'Hiace');
    
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
          train_fees: train,
          bus_fees  : bus,
          hiace_fees  :  hiacs ,
          private_request_fees   : Private ,
        };

        

        if (edit) {
            const { sendData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/fees/update/${sendData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    toast.success('fees updated successfully');
                    setTimeout(() => {
                        navigate('/Settings/Fees');
                    }, 2000);
                })
                .catch(() => {
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/fees/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                toast.success('fees added  successfully');

                setTimeout(() => {
                    navigate('/Settings/Fees');
                }, 2000);
            })
            .catch(() => {
            });
             settrain('');
             setbus('');
             sethiacs('');
          setPrivate('');

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
      <div className='ml-6 mt-6 '>

            <AddAll navGo='/Settings/Fees' name="Add Fees" />
        <div className=' flex flex-wrap mt-6 gap-6'>
          <div>

            <InputField
                placeholder="train fees "
                name="train"
                value={train}
                email="number"
                onChange={handleChange}
                />
                </div>
          <div>

            <InputField
                placeholder="bus fees"
                name="bus"
                value={bus}
                email="number"
                onChange={handleChange}
                />
                </div>
          <div>

            <InputField
                placeholder="hiace fees"
                name="hiace"
                value={hiacs}
                email="number"
                onChange={handleChange}
                />
                </div>
          <div>

            <InputField
                placeholder="Private fees"
                name="Private"
                value={Private}
                email="number"
                onChange={handleChange}
                />

                </div>
                </div>

            <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
        </div>
    );
};

export default AddFees;
