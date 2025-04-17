import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import picdone from '../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../ui/InputField';
import FileUploadButton from '../../ui/FileUploadButton';
import Inputfiltter from '../../ui/Inputfiltter';

const AddAgents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalFlag, setOriginalFlag] = useState(null);
  const [flag, setFlag] = useState(null);
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [trainCommission, setTrainCommission] = useState('');
  const [busCommission, setBusCommission] = useState('');
  const [hiaceCommission, setHiaceCommission] = useState('');

  const [trainType, setTrainType] = useState('');
  const [busType, setBusType] = useState('');
  const [hiaceType, setHiaceType] = useState('');

  const [enableTrain, setEnableTrain] = useState(false);
  const [enableBus, setEnableBus] = useState(false);
  const [enableHiace, setEnableHiace] = useState(false);
  const [fixedone,setfixedone]=useState(true)
  const [fixedtwo,setfixedtwo]=useState(true)
  const [fixedthree,setfixedthree]=useState(true)

  const [privaterequset, setprivaterequset] = useState('');
  const [enableprivate, setEnableprivate] = useState(false);
   const [loading, setLoading] = useState(true);
 
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    flag: '',
    description: '',
  });

  const handleFileChange = (file) => {
    if (file) {
      setFlag(file);
    }
  };

  
  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setName(sendData.name);
      setDescription(sendData.description);
      setEmail(sendData.email);
      setPassword(sendData.password);
      setPhone(sendData.phone);
      setEdit(true);
  
      if (sendData.image) {
        setFlag(sendData.image);
        setOriginalFlag(sendData.image);
      }
  
    
      setEnableTrain(true);
      setEnableBus(true);
      setEnableHiace(true);
      setEnableprivate(true);
    
      const token = localStorage.getItem('token');
      const commission = sendData.commissions[0];
      console.log(commission)
      axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          const defaultCommission = response.data.default_commission;


          if (commission.train === defaultCommission.train) {
            setTrainType("Default");
          } else {
            setTrainType("Private");
          }
  
          if (commission.bus === defaultCommission.bus) {
            setBusType("Default");
          } else {
            setBusType("Private");
          }
  
          if (commission.hiace === defaultCommission.hiace) {
            setHiaceType("Default");
          } else {
            setHiaceType("Private");
          }
        })
        .catch(err => {
          console.error("Error fetching default commission:", err);
        });
      
  
      if (!commission) {
        setTrainCommission('');
        setBusCommission('');
        setHiaceCommission('');
        setprivaterequset('');
      } else {
        setTrainCommission(commission.train);
        setBusCommission(commission.bus);
        setHiaceCommission(commission.hiace);
        setprivaterequset(commission.privateRequest);
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
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'phone') setPhone(value);
    if (name === 'description') setDescription(value);
    if (name === 'trainCommission'&&fixedone) setTrainCommission(value);
    if (name === 'busCommission'&&fixedtwo) setBusCommission(value);
    if (name === 'hiaceCommission'&&fixedthree) setHiaceCommission(value);
    if (name === 'trainType') setTrainType(value);
    if (name === 'busType') setBusType(value);
    if (name === 'hiaceType') setHiaceType(value);
    if (name === 'privaterequset') setprivaterequset(value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'name is required';
    if (!description) formErrors.description = 'description is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if (!edit && password.length < 8) formErrors.password = 'Password must be at least 6 characters';
    if (!phone) formErrors.phone = 'Phone is required';
    if (!trainCommission) formErrors.trainCommission = 'trainCommission is required';
    if (!busCommission) formErrors.busCommission = 'busCommission is required';
    if (!hiaceCommission) formErrors.hiaceCommission = 'hiaceCommission is required';
    if (!privaterequset) formErrors.hiaceCommission = 'privaterequset is required';
    else if (!/^[+]?\d+$/.test(phone)) formErrors.phone = 'Phone should contain only numbers or start with a "+"';
    if (!flag && !edit) formErrors.flag = 'Flag is required';

    if (enableTrain && isNaN(trainCommission)) formErrors.trainCommission = 'Train commission must be a number';
    if (enableBus && isNaN(busCommission)){ formErrors.busCommission = 'Bus commission must be a number';
    }

    if (enableHiace && isNaN(hiaceCommission)) formErrors.hiaceCommission = 'Hiace commission must be a number';

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => toast.error(error));
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const newCountryData = {
      name,
      email,
      password,
      phone,
      description,
      commission_type: "private", // أو استخدم القيمة المناسبة بناءً على متطلباتك
      bus_modules: enableBus ? 1 : 0,  // إذا تم تمكين Bus، تكون القيمة 1، وإلا 0
      train_modules: enableTrain ? 1 : 0,  // إذا تم تمكين Train، تكون القيمة 1، وإلا 0
      hiace_modules: enableHiace ? 1 : 0,  // إذا تم تمكين Hiace، تكون القيمة 1، وإلا 0
      private_modules:enableprivate? 1 : 0
    };
    
    if (enableTrain) newCountryData.train_commission = trainCommission;
    if (enableBus) newCountryData.bus_commission = busCommission;
    if (enableHiace) newCountryData.hiace_commission = hiaceCommission;
    if (enableprivate) newCountryData.privateRequest_commission = privaterequset;
    if (flag !== originalFlag) {
      newCountryData.image = flag;
    }

    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/operator/update/${sendData.id}`, newCountryData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          toast.success('Operator updated successfully');
          setTimeout(() => navigate('/Agents'), 3000);
        })
        .catch((error) =>{
          toast.error(error);}
      );
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/operator/add', newCountryData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast.success('Operator added successfully');
        setTimeout(() => navigate('/Agents'), 3000);
      })
      .catch(error => {
        toast.error(error);
      });

    setDescription('');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setFlag(null);
    setEdit(false);
    setTrainCommission('');
     setBusCommission('');
    setHiaceCommission('');
     setTrainType('');
    setBusType('');
    setHiaceType('');
setEnableTrain(false);
setEnableBus(false);
  setEnableHiace(false);
setEnableprivate(false);
    setfixedone(true)
  setfixedtwo(true)
  setfixedthree(true)
  setEnableprivate(false)
  setprivaterequset('')
  };
// Train
useEffect(() => {
  const token = localStorage.getItem('token');
  if (enableTrain) {
    if (trainType === "Default") {
      axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setfixedone(false);
        setTrainCommission(response.data.default_commission.train);
      }).catch(error => toast.error(error.message));
    } else if (trainType === "Private") {
      setfixedone(true);
    }
  }
}, [enableTrain, trainType]);

// Bus
useEffect(() => {
  const token = localStorage.getItem('token');
  if (enableBus) {
    if (busType === "Default") {
      axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setfixedtwo(false);
        setBusCommission(response.data.default_commission.bus);
      }).catch(error => toast.error(error.message));
    } else if (busType === "Private") {
      setfixedtwo(true);    }
  }
}, [enableBus, busType]);

// Hiace
useEffect(() => {
  const token = localStorage.getItem('token');
  if (enableHiace) {
    if (hiaceType === "Default") {
      axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setfixedthree(false);
        setHiaceCommission(response.data.default_commission.hiace);
      }).catch(error => toast.error(error.message));
    } else if (hiaceType === "Private") {
      setfixedthree(true);
    }
  }
}, [enableHiace, hiaceType]);


if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
    </div>
  );
}

  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Agents' name="Add Agents" />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField placeholder="Name" name="name" value={name} onChange={handleChange} required />
        <InputField placeholder="Description" name="description" value={description} onChange={handleChange} required />
        <InputField placeholder="Phone" name="phone" value={phone} onChange={handleChange} required />
        <InputField placeholder="Email" name="email" value={email} onChange={handleChange} required />
        <InputField placeholder="Password" name="password" value={password} onChange={handleChange} required />
        <div className='flex items-end justify-center'>

        <FileUploadButton name="image" kind="image" flag={flag} onFileChange={handleFileChange} />
</div>  
</div>
<div className=' flex  gap-2'>

        {/* Train Commission */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                enableTrain ? 'bg-green-500' : ''
              }`}
              onClick={() => {
                const value = !enableTrain;
                setEnableTrain(value);
                if (!value) {
                  setTrainCommission('');
                  setTrainType('');
                }
              }}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  enableTrain ? 'translate-x-6' : ''
                }`}
              ></div>
            </div>
             Train Commission
          </label>
          {enableTrain && (
            <>
              <Inputfiltter
//
name="swticher"
placeholder="type"
                value={trainType}
                onChange={()=>setTrainType(event.target.value)}
              />
              {(trainType === 'Default' || trainType === 'Private') && (
                <InputField
                  placeholder="Train Commission"
                  name="trainCommission"
                  value={trainCommission}
                  onChange={handleChange}
                />
              )}
            </>
          )}
        </div>

        {/* Bus Commission */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                enableBus ? 'bg-green-500' : ''
              }`}
              onClick={() => {
                const value = !enableBus;
                setEnableBus(value);
                if (!value) {
                  setBusCommission('');
                  setBusType('');
                }
              }}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  enableBus ? 'translate-x-6' : ''
                }`}
              ></div>
            </div>
             Bus Commission
          </label>
          {enableBus && (
            <>
              <Inputfiltter
              //
        name="swticher"
                        placeholder="type"
                value={busType}
                onChange={()=>setBusType(event.target.value)}
              />
              {(busType === 'Default' || busType === 'Private') && (
                <InputField
                  placeholder="Bus Commission"
                  name="busCommission"
                  value={busCommission}
                  onChange={handleChange}
                />
              )}
            </>
          )}
        </div>

        {/* Hiace Commission */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                enableHiace ? 'bg-green-500' : ''
              }`}
              onClick={() => {
                const value = !enableHiace;
                setEnableHiace(value);
                if (!value) {
                  setHiaceCommission('');
                  setHiaceType('');
                }
              }}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  enableHiace ? 'translate-x-6' : ''
                }`}
              ></div>
            </div>
             Hiace Commission
          </label>
          {enableHiace && (
            <>
              <Inputfiltter
              //
        name="swticher"
        
                        placeholder="type"
                value={hiaceType}
                onChange={()=>setHiaceType(event.target.value)}
              />
              {(hiaceType === 'Default' || hiaceType === 'Private') && (
                <InputField
                  placeholder="Hiace Commission"
                  name="hiaceCommission"
                  value={hiaceCommission}
                  onChange={handleChange}
                />
              )}
            </>
          )}
        </div>
      </div>


{/* privte */}
<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2 cursor-pointer">
    <div
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
        enableprivate ? 'bg-green-500' : ''
      }`}
      onClick={() => {
        const value = !enableprivate;
        setEnableprivate(value);
      }}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          enableprivate ? 'translate-x-6' : ''
        }`}
      ></div>
    </div>
    Private Request Commission
  </label>
  {enableprivate && (
    <>
      <InputField
        placeholder="Private Request Commission"
        name="privaterequset"
        value={privaterequset}
        onChange={handleChange}
      />
    </>
  )}
</div>
   

      <div className="flex gap-3">
      <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddAgents;
