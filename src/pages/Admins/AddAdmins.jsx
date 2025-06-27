import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploadButton from '../../ui/FileUploadButton';
import InputArrow from '../../ui/InputArrow'
import { useNavigate, useLocation } from 'react-router-dom';
const AddAdmins = () => {
   const navigate = useNavigate();
    const location = useLocation();
     const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
        const [password, setPassword] = useState('');
        const [edit, setEdit] = useState(false);
        const [adminid, setAdminid] = useState('');
          const [loading, setLoading] = useState(true);
          const [flag, setFlag] = useState(null);
          const [originalFlag, setOriginalFlag] = useState(null);
            const [email, setEmail] = useState('');
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
                .filter((role) => role.module === "admin")
                .map((role) => role.action);
              setActions(paymentActions);
            }, []);
          const [errors, setErrors] = useState({
            name: '',
            phone: '',
            adminid: '',
            email: '',
            password: ''
          });
            const handleFileChange = (file) => {
    if (file) setFlag(file);
  };
   useEffect(() => {
      const { sendData } = location.state || {};
      if (sendData) {
        setName(sendData.name??'');
        setPhone(sendData.phone??'');
        setEmail(sendData.email??'');
        setAdminid(sendData.position?.id??'');
        setFlag(sendData.image??null);
        setOriginalFlag(sendData.image??null)
        setEdit(true);
      }
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }, [location.state]);

      const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'admin') setAdminid(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

   const validateForm = () => {
      let formErrors = {};
  
      if (!name) formErrors.name = 'Name is required';
      // if (!adminid) formErrors.adminid = 'Admin roles is required';
      if (!phone) {
        formErrors.phone = 'Phone is required';
      } else if (!/^\+?\d+$/.test(phone)) { 
        formErrors.phone = 'Phone should contain only numbers or start with a "+"';
      }
      if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
      if (!edit && password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
      }
  
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
  
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
  

  const handleSave = () => {
    console.log(adminid)
    if (!validateForm()) {
      return; 
    }
 const token = localStorage.getItem('token');
    const newUser = {
      name,
      phone,
      email,
      admin_position_id:adminid,
    };
      if (!edit) {
      newUser.password = password;
    }
     if (flag !== originalFlag) {
      newUser.image = flag;
    }
     if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/admin/update/${sendData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Admin updated successfully'); 
          setTimeout(() => {
            navigate('/Admins');
          }, 2000);
        })
    .catch((error) => {
     const errors = error?.response?.data?.message;
   
     // استخراج أول رسالة من أول مفتاح
     if (errors && typeof errors === 'object') {
       const firstKey = Object.keys(errors)[0];
       const firstMessage = errors[firstKey][0];
       toast.error(firstMessage);
     } else {
       toast.error("Something went wrong.");
     }
   });
   
      return;
    }
  axios.post('https://bcknd.ticket-hub.net/api/admin/admin/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Admin added successfully'); 
        setTimeout(() => {
          navigate('/Admins');
        }, 2000);
      })
     .catch((error) => {
      const errors = error?.response?.data?.message;
    
      // استخراج أول رسالة من أول مفتاح
      if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0];
        const firstMessage = errors[firstKey][0];
        toast.error(firstMessage);
      } else {
        toast.error("Something went wrong.");
      }
    });
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    flag(null);
    setOriginalFlag(null);
    handleFileChange(null);
    setEdit(false);
    setAdminid('')
    }
    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }
  return (
 <div className="ml-6">
      <AddAll navGo="/Admins" name={edit?"Edit Admin":" Add Admin"} />   
      {(actions.includes('add') || actions.includes("edit")) && (
<>   
        <div className="flex flex-wrap gap-6 mt-6">

        <InputField
          placeholder="User"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
         <InputArrow
          placeholder="Admin"
          name="admin"
          value={adminid}
          onChange={handleChange}
        
          required
        />
        <InputField
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
             <InputField
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
         <FileUploadButton
        name="flag"
        kind="flag"
        flag={flag}
        onFileChange={handleFileChange}
      />
          
      </div>
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
    </div>  )
}

export default AddAdmins