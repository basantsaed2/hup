import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import InputArrow from '../../../ui/InputArrow'
import SwitchButton from '../../../ui/SwitchButton';
import InputField from '../../../ui/InputField'
import Inputfiltter from '../../../ui/Inputfiltter'


const AddOffStation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');
  const [valuee, setValue] = useState("inactive");
  const [pickup, setpickup] = useState("0");
  const [dropoff, setdropoff] = useState("0");
  const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    country: '',
    city: "",
    name: '',
    zone: '',
  });
  useEffect(() => {
    const { sendData } = location.state || {};
    console.log(sendData)
    if (sendData) {
      setCountry(sendData.country_id);
      setCity(sendData.city_id);
      setZone(sendData.zone_id)
      setName(sendData.name);
      setValue(sendData.status);
      setpickup(sendData.pickup);
      setdropoff(sendData.dropoff);
      setEdit(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setCountry(value);
    if (name === 'name') setName(value);
    if (name === 'zones') setZone(value);
    if (name === 'cities') setCity(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!country) formErrors.country = 'Country is required';
    if (!name) formErrors.name = 'name is required';
    if (!city) formErrors.city = 'city is required';
    if (!zone) formErrors.zone = 'zone is required';
    if (pickup === "0" && dropoff === "0") formErrors.check = "At least choose one"
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
      country_id: country,
      city_id: city,
      status: valuee,
      pickup: pickup,
      dropoff: dropoff,
      zone_id: zone,
      basic_station: "0"
    };


    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/station/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Stations updated successfully');

          setTimeout(() => {
            navigate('/Location/Stations');
          }, 2000);
        })
        .catch(error => {
          console.error('Error updating country:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/station/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Stations added successfully');

        setTimeout(() => {
          navigate('/Location/Stations');
        }, 2000);
      })
      .catch(() => {
      });

    setpickup("0")
    setdropoff("0")
    setValue("inactive");

    setCountry('');
    setName('');
    setCity('');
    setZone('')
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

      <AddAll navGo='/Location/Stations' name="add Stations" />
      <div className='flex flex-wrap gap-6  mt-6'>
        <InputField placeholder="Stations"
          name="name"
          value={name}
          onChange={handleChange}
          required />

        <InputArrow like
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
        />      </div>

      <SwitchButton value={valuee} setValue={setValue} />
      <SwitchButton value={pickup} num title="pickup" setValue={setpickup} />
      <SwitchButton value={dropoff} num title="dropoff" setValue={setdropoff} />

      <button onClick={handleSave}>
      <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
      </button>
      <ToastContainer />




    </div>
  )
}

export default AddOffStation
