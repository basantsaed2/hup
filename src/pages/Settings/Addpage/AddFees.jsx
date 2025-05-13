import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddFees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [train, setTrain] = useState('');
  const [bus, setBus] = useState('');
  const [hiacs, setHiacs] = useState('');
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
      setTrain(parseFloat(sendData.train_fees).toFixed(2));
      setBus(parseFloat(sendData.bus_fees).toFixed(2));
      setHiacs(parseFloat(sendData.hiace_fees).toFixed(2));
      setPrivate(parseFloat(sendData.private_request_fees).toFixed(2));
      setEdit(true);
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value !== '' && !isNaN(value) ? parseFloat(value).toFixed(2) : value;

    if (name === 'train') setTrain(formattedValue);
    if (name === 'bus') setBus(formattedValue);
    if (name === 'hiace') setHiacs(formattedValue);
    if (name === 'Private') setPrivate(formattedValue);
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
        let valueStr = parseFloat(value).toFixed(2);
        const decimalPart = valueStr.split('.')[1];
        if (decimalPart.length > 2) {
          formErrors[fieldName] = `${label} must have at most 2 decimal places`;
        }
      }
    };

    validateField(train, 'train', 'Train');
    validateField(bus, 'bus', 'Bus');
    validateField(Private, 'Private', 'Private');
    validateField(hiacs, 'hiacs', 'Hiace');

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => toast.error(error));

    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const newCountryData = {
      train_fees: parseFloat(train).toFixed(2),
      bus_fees: parseFloat(bus).toFixed(2),
      hiace_fees: parseFloat(hiacs).toFixed(2),
      private_request_fees: parseFloat(Private).toFixed(2),
    };

    if (edit) {
      const { sendData } = location.state || {};
      axios
        .put(`https://bcknd.ticket-hub.net/api/admin/fees/update/${sendData.id}`, newCountryData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success('Fees updated successfully');
          setTimeout(() => {
            navigate('/Settings/Fees');
          }, 2000);
        })
        .catch(() => {});
      return;
    }

    axios
      .post('https://bcknd.ticket-hub.net/api/admin/fees/add', newCountryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Fees added successfully');
        setTimeout(() => {
          navigate('/Settings/Fees');
        }, 2000);
      })
      .catch(() => {});

    setTrain('');
    setBus('');
    setHiacs('');
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
    <div className="ml-6 mt-6">
      <AddAll navGo="/Settings/Fees" name={edit ? 'Edit Fees' : 'Add Fees'} />

      <div className="flex flex-wrap mt-6 gap-6">
        <InputField placeholder="Train fees" name="train" value={train} email="number" onChange={handleChange} />
        <InputField placeholder="Bus fees" name="bus" value={bus} email="number" onChange={handleChange} />
        <InputField placeholder="Hiace fees" name="hiace" value={hiacs} email="number" onChange={handleChange} />
        <InputField placeholder="Private fees" name="Private" value={Private} email="number" onChange={handleChange} />
      </div>

      <div className="flex gap-3">
        <button
          className="bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden"
          onClick={handleSave}
        >
          <span className="h-[56px] mx-auto lg:h-[72px] w-[400px] text-white text-2xl rounded-[8px] mt-2 lg:mt-5 transform transition hover:scale-95">
            {edit ? 'Edit' : 'Add'}
          </span>
          <span className="absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45"></span>
          <span className="absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30"></span>
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddFees;
