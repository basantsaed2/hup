import React, { useEffect, useState } from "react";
import AddAll from "../../../ui/AddAll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../../../ui/InputField";

const AddTraintype = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
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
        .filter((role) => role.module === "trainTypes")
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
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.country = "name is required";
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

    const token = localStorage.getItem("token");
    const newCountryData = {
      name: name,
    };

    console.log("Data to be sent:", newCountryData);

    if (edit) {
      const { sendData } = location.state || {};
      axios
        .put(
          `https://bcknd.ticket-hub.net/api/admin/trainType/update/${sendData.id}`,
          newCountryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("type updated successfully");
          setTimeout(() => {
            navigate("/Train");
          }, 2000);
        })
        .catch(() => {                         toast.error("failed");
        });
      return;
    }

    axios
      .post(
        "https://bcknd.ticket-hub.net/api/admin/trainType/add",
        newCountryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("type added  successfully");

        setTimeout(() => {
          navigate("/Train");
        }, 2000);
      })
      .catch(() => {                         toast.error("failed");
      });

    setName("");
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
    <div className="ml-6 flex flex-col mt-6 gap-6">
      <AddAll
        navGo="/Train"
        name={edit ? "Edit  train type" : "Add  train type"}
      />
      {(actions.includes('add') || actions.includes("edit")) && (
<>
      <InputField
        placeholder="Type Name"
        name="name"
        value={name}
        onChange={handleChange}
      />

      <div className="flex gap-3">
        <button
          className=" bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden "
          onClick={handleSave}
        >
          <span className=" h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95">
            {" "}
            {edit ? "Edit" : "Add"}
          </span>
          <span className="absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45"></span>
          <span className="absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30"></span>
        </button>
      </div>
      </>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddTraintype;
