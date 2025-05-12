import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow'
import SwitchButton from '../../../ui/SwitchButton';
const Addtrains = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [agent, setagent] = useState('');
  const [type, settype] = useState('');
  const [route, setroute] = useState('');
  const [country, setcountry] = useState('');
  const [theclass, settheclass] = useState('');
  const [valuee, setValue] = useState("0");
  const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    name: '',
    agent: '',  
    type: '',
    route: '',
    country: '',
    theclass: '',
  });
    useEffect(() => {
          const { sendData } = location.state || {};
          if (sendData) {
              setName(sendData.name);
              setagent(sendData.agent_id);
              settype(sendData.type_id);
              setroute(sendData.route_id);
              setcountry(sendData.country_id);
              settheclass(sendData.class_id);
              setValue(sendData.status);
              setEdit(true);
          }
          const timeout = setTimeout(() => {
            setLoading(false);
          }, 1000);
      
          return () => clearTimeout(timeout);
      }
          , [location.state]);

           const handleChange = (e) => {
                  const { name, value } = e.target;
                  if (name === 'name') setName(value);
                  if (name === 'agents') setagent(value);
                  if (name === 'trainTypes') settype(value);
                  if (name === 'trainRoutes') setroute(value);
                  if (name === 'countries') setcountry(value);
                  if (name === 'trainclasses') settheclass(value);
              };
              const validateForm = () => {
                  let formErrors = {};
                  if (!name) formErrors.country = 'name is required';
                  if (!agent) formErrors.country = 'agent is required';
                  if (!type) formErrors.country = 'type is required';
                  if (!route) formErrors.country = 'route is required';
                  if (!country) formErrors.country = 'country is required';
                  if (!theclass) formErrors.country = 'class is required';
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
                    agent_id: agent,
                    type_id: type,
                    route_id: route,
                    country_id: country,
                    class_id: theclass,
                    status: valuee,
                }
        
                console.log("Data to be sent:", newCountryData);
        
                if (edit) {
                    const { sendData } = location.state || {};
                    axios.put(`https://bcknd.ticket-hub.net/api/admin/train/update/${sendData.id}`, newCountryData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(() => {
                            toast.success('Train updated successfully');
                            setTimeout(() => {
                                navigate('/Train/Trains');
                            }, 2000);
                        })
                        .catch(() => {
                        });
                    return;
                }
        
                axios.post('https://bcknd.ticket-hub.net/api/admin/train/add', newCountryData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(() => {
                        toast.success('Class added  successfully');
        
                        setTimeout(() => {
                            navigate('/Train/Trains');
                        }, 2000);
                    })
                    .catch(() => {                    });
        
                setName('');
                setagent("");
                settype("");
                setroute("");
                setcountry("");
                settheclass("");
                setValue("0");
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
      <AddAll navGo='/Train/Trains' name={edit?"Edit train":"Add train"} />
      <div className='flex flex-wrap  gap-6 mt-6'>
        <InputField
          placeholder="train "
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="Country"
          name="countries"
          value={country}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="agaent"
          name="agents"
          value={agent}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="type"
          name="trainTypes"
          value={type}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="route"
          name="trainRoutes"
          value={route}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="class"
          name="trainclasses"
          value={theclass}
          onChange={handleChange}
          required
        />
      
       
      </div>
<SwitchButton value={valuee} num setValue={setValue} />
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

export default Addtrains
