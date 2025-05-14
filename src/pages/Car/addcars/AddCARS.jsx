import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow';
import Inputfiltter from '../../../ui/Inputfiltter';
import FileUploadButton from '../../../ui/FileUploadButton';
import SwitchButton from '../../../ui/SwitchButton';
const AddCARS = () => {
    const navigate = useNavigate();
    const location = useLocation();
      const [loading, setLoading] = useState(true);
    const [category, setcategory] = useState('');
    const [flag, setFlag] = useState(null);
    const [brand, setbrand] = useState('')
    const [model, setmodel] = useState('')
    const [agent, setagent] = useState('')
    const [carnumber, setcarnumber] = useState('')
    const [carcolor, setcarcolor] = useState('')
    const [caryear, setcaryear] = useState('')
    const [originalFlag, setOriginalFlag] = useState(null);
    const [edit, setEdit] = useState(false);
    const [valuee, setValue] = useState("busy");
    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };
    const [errors, setErrors] = useState({
        category: '',
        flag: '',
        brand: '',
        agent: '',
        model: '',
        carnumber: '',
        carcolor: '',
        caryear: '',
    });



    useEffect(() => {
        const { sendData } = location.state || {};
        if (sendData) {
            setcategory(sendData.category_id);
            setbrand(sendData.brand_id)
            setmodel(sendData.model_id)
            setagent(sendData.agent_id)
            setcarnumber(sendData.car_number)
            setcarcolor(sendData.car_color)
            setcaryear(sendData.car_year)
            setValue(sendData.status);
            setEdit(true);

            setbrand(sendData.brand_id)
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
        if (name === 'car_categories') setcategory(value);
        if (name === 'car_brands') setbrand(value);
        if (name === 'car_models') setmodel(value);
        if (name === 'operators') setagent(value);
        if (name === 'number') setcarnumber(value);
        if (name === 'color') setcarcolor(value);
        if (name === 'year') setcaryear(value);

    };

    const validateForm = () => {
        let formErrors = {};
        if (!category) formErrors.category = 'category is required';
        if (!brand) formErrors.brand = 'brand is required';
        if (!model) formErrors.model = 'model is required';
        if (!agent) formErrors.agent = 'agent is required';
        if (!carnumber) formErrors.carnumber = 'carnumber is required';
        if (!carcolor) formErrors.carcolor = 'carcolor is required';
        if (!caryear) formErrors.caryear = 'caryear is required';
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

            status: valuee,
            category_id: category,
            brand_id: brand,
            model_id: model,
            agent_id: agent,
            car_number: carnumber,
            car_color: carcolor,
            car_year: caryear,

        };

        if (flag !== originalFlag) {
            newCountryData.image = flag;
        }

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { sendData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/car/update/${sendData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('car  updated successfully:', response.data);
                    toast.success('car  updated successfully');
                    setTimeout(() => {
                        navigate('/Car/CARS');
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error updating BRANDS:', error);
                    toast.error("network");

                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/car/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('car  added successfully:', response.data);
                toast.success('car  added  successfully');

                setTimeout(() => {
                    navigate('/Car/CARS');
                }, 2000);
            })
            .catch(error => {
                console.error('Error adding country:', error);
                toast.error("network");

            });

        setcategory('');
        setcarcolor('');
        setcaryear('');
        setcarnumber('');
        setagent('');
        setmodel('');
        setbrand('')
        setFlag(null);
        setValue('busy');
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
            <AddAll navGo='/Car/CARS' name={edit?"Edit Cars":"Add Cars"} />
            <div className='flex flex-wrap gap-6'>
            <InputArrow 
                placeholder="categories"
                name="car_categories"
                value={category}
                onChange={handleChange}
                required
            />
            <Inputfiltter
                placeholder="brands"
                name="car_brands"
                value={brand}
                onChange={handleChange}
                shara={category}
                required
            />
             <Inputfiltter
                
                placeholder="models"
                name="car_models"
                value={model}
                onChange={handleChange}
                shara={brand}
                required
            />
             <InputArrow 
                placeholder="agent"
                name="operators"
                value={agent}
                onChange={handleChange}
                required
            />
                  <div className='flex items-end justify-center'>

            <FileUploadButton
                name="flag"
                kind="flag"
                flag={flag}
                onFileChange={handleFileChange}
            />
            </div>
 <InputField
      placeholder="color"
      name="color"
      value={carcolor}
      onChange={handleChange}
      required
    />
     <InputField
      placeholder="car number"
      name="number"
      value={carnumber}
      onChange={handleChange}
      required
    />
     <InputField
      placeholder="car year"
      name="year" 
      value={caryear}
      onChange={handleChange}
      required
    />

            <SwitchButton avl value={valuee} setValue={setValue} />
               <div className="flex gap-3">
     
        <button className=' bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden 'onClick={handleSave}>
              <span className=' h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95'  > {edit?"Edit":"Add"}</span>
               <span className='absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45'></span>
               <span className='absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30'></span>


          </button>
      </div>
            <ToastContainer />
            </div>
        </div>
    )
}

export default AddCARS
