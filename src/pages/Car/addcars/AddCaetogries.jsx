import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import FileUploadButton from '../../../ui/FileUploadButton';
import SwitchButton from '../../../ui/SwitchButton';
const AddCaetogries = () => {
     const navigate = useNavigate();
        const location = useLocation();
        const [name, setName] = useState('');
        const [flag, setFlag] = useState(null);
        const [originalFlag, setOriginalFlag] = useState(null);
        const [edit, setEdit] = useState(false);
        const [valuee, setValue] = useState("inactive");
          const [loading, setLoading] = useState(true);
        
    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };

     const [errors, setErrors] = useState({
            name: '',
            flag: '',
        });

       
    
        useEffect(() => {
                const { sendData } = location.state || {};
                if (sendData) {
                    setName(sendData.name);
                    setValue(sendData.status);
                    setEdit(true);
        
                    if (sendData.image) {
                                setFlag(sendData.image);
                                setOriginalFlag(sendData.image); // حفظ الصورة الأصلية
                      
                    }
                }
                const timeout = setTimeout(() => {
                    setLoading(false);
                  }, 1000);
              
                  return () => clearTimeout(timeout);
            }, [location.state]);
        
            const handleChange = (e) => {
                const { name, value } = e.target;
                if (name === 'name') setName(value);
            };

            const validateForm = () => {
                    let formErrors = {};
                    if (!name) formErrors.name = 'name is required';
                    if (!flag && !edit) formErrors.flag = 'image is required';
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
                        status: valuee,
                    };
            
                    if (flag !== originalFlag) {
                        newCountryData.image = flag;
                    }
            
                    console.log("Data to be sent:", newCountryData);
            
                    if (edit) {
                        const { sendData } = location.state || {};
                        axios.put(`https://bcknd.ticket-hub.net/api/admin/car_category/update/${sendData.id}`, newCountryData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then(() => {
                                toast.success('car category updated successfully');
                                setTimeout(() => {
                                    navigate('/Car');
                                }, 2000);
                            })
                            .catch(() => {
                                toast.error("network");

                            });
                        return;
                    }
            
                    axios.post('https://bcknd.ticket-hub.net/api/admin/car_category/add', newCountryData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(() => {
                            toast.success('car category added  successfully');
            
                            setTimeout(() => {
                                navigate('/Car');
                            }, 2000);
                        })
                        .catch(() => {
                            toast.error("network");

                        });
            
                    // Reset the form for a new entry
                    setName('');
                    setFlag(null);
                    setValue('inactive');
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
    <AddAll navGo='/Car' name={edit?"Edit Caetogries":"Add Caetogries"} />
    <InputField
        placeholder=" Name"
        name="name"
        value={name}
        onChange={handleChange}
    />
    <FileUploadButton
        name="flag"
        kind="flag"
        flag={flag}
        onFileChange={handleFileChange}
    />
    <SwitchButton  num value={valuee} setValue={setValue} />
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

export default AddCaetogries
