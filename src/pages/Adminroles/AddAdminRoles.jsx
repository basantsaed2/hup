import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemsBox from '../../ui/ItemsBox';

const AddAdminRoles = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const [modules, setModules] = useState([]);
  const [actions, setActions] = useState([]);
const [selectedRoles, setSelectedRoles] = useState({});


const [actionsroles, setActionsroles] = useState([]);
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
      .filter((role) => role.module === "admin_role")
      .map((role) => role.action);
    setActionsroles(paymentActions);
  }, []);

  const [errors, setErrors] = useState({ name: '' });

  useEffect(() => {
      const token = localStorage.getItem('token');

 if (location.state && location.state.sendData) {
    const { sendData } = location.state;
    setEdit(true);
    setName(sendData.name);

    const rolesObject = {};
    sendData.roles.forEach((role) => {
      if (!rolesObject[role.module]) {
        rolesObject[role.module] = [];
      }
      // role.action ممكن تكون string أو array
      if (Array.isArray(role.action)) {
        rolesObject[role.module].push(...role.action);
      } else {
        rolesObject[role.module].push(role.action);
      }
    });

    setSelectedRoles(rolesObject); 
  }
    axios
      .get('https://bcknd.ticket-hub.net/api/admin/admin_role', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setModules(response.data?.modules);
        setActions(response.data?.actions);

        setLoading(false);
      })
      .catch(() => {
        toast.error('Error fetching data');
        setLoading(false);
      });
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'Name is required';

    if (selectedRoles.length === 0 ) {
      toast.error('Please select at least one module or action');
      return false;
    }

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => toast.error(error));
    return Object.keys(formErrors).length === 0;
  };
const handleSave = () => {
  if (!validateForm()) return;

const roles = Object.entries(selectedRoles)
  .filter(([modules, actions]) => actions && actions.length > 0)  
    .map(([modules, actions]) => ({
    module:modules,
    action: actions,
  }));


console.log(roles)
  const NewRoles = {
    name,
    roles,
  };

  const token = localStorage.getItem('token');

  const request = edit
    ? axios.post(
        `https://bcknd.ticket-hub.net/api/admin/admin_role/update/${location.state.sendData.id}`,
        NewRoles,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    : axios.post('https://bcknd.ticket-hub.net/api/admin/admin_role/add', NewRoles, {
        headers: { Authorization: `Bearer ${token}` },
      });

  request
    .then(() => {
      toast.success(`Admin Role ${edit ? 'updated' : 'added'} successfully`);
      setTimeout(() => navigate('/AdminRoles'), 2000);
    })
    .catch((error) => {
      const errors = error?.response?.data?.message;
      if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0];
        const firstMessage = errors[firstKey][0];
        toast.error(firstMessage);
      } else {
        toast.error('Something went wrong.');
      }
    });
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="ml-6 flex flex-col mt-6 gap-6">
      <AddAll navGo="/AdminRoles" name={edit ? 'Edit Admin Roles' : 'Add Admin Roles'} />
{(actionsroles.includes('add') || actionsroles.includes("edit")) && (
<>
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField placeholder="Name" name="name" value={name} onChange={handleChange} required />
      </div>

      <div className="flex gap-5 p-2">
        <ItemsBox
    modules={modules}
    actions={actions}
    selectedRoles={selectedRoles}
    setSelectedRoles={setSelectedRoles}
  />
     
      </div>

      <div className="flex gap-3">
        <button
          className="bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden"
          onClick={handleSave}
        >
          <span className="h-[56px] mx-auto lg:h-[72px] w-[400px] text-white text-2xl rounded-[8px] mt-2 lg:mt-5 transform transition hover:scale-95">
            {edit ? 'Edit' : 'Add'}
          </span>
          <span className="absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30"></span>
          <span className="absolute w-20 h-20 right-45 lg:right-60 bg-three top-0 transform transition rotate-45"></span>
        </button>
      </div>
</>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddAdminRoles;
