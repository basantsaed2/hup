import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const InputArrow = ({ placeholder, value, like, onChange, name }) => {
  
  const [arrayof, setArray] = useState([]);
  const [control, setControl] = useState(name);

  const shape = like
    ? "absolute top-[60%] left-43 md:left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
    : "absolute top-[60%] right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

  useEffect(() => {
    
    const token = localStorage.getItem('token');

    axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (name === "countries") return setArray(response.data.countries);
        if (name === "cities") return setArray(response.data.cities);
        if (name === "zones") return setArray(response.data.zones);
        if (name === "users") return setArray(response.data.users);
        if (name === "car_categories") return setArray(response.data);
        if (name === "car_brands") return setArray(response.data);
        if (name === "operators") return setArray(response.data.operators);
        if (name === "busses") return setArray(response.data.buses);
        if (name === "currencies") return setArray(response.data.currancies);
        if (name === "trainTypes") return setArray(response.data.trainTypes);
        if (name === "trainRoutes") return setArray(response.data.routes);
        if (name === "trainclasses") return setArray(response.data.trainClasses);
        if (name === "agents") return setArray(response.data.agents);
       
      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [name]);  

  return (
    <div className="relative group flex flex-col gap-3 items-start justify-center">
      <IoIosArrowDown className={shape} />
      <span className='font-bold  text-one'>{placeholder}</span>
      <select
        id="options"
        value={value}
        onChange={onChange}
        name={name}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          paddingRight: '20px',
          backgroundImage: 'none',
        }}
        className="w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10"
      >
        <option value="null">{placeholder}</option>
        {arrayof && arrayof.length > 0 && arrayof.map((item) => {
          if (control === "countries") {
            return (
              <option key={item.id} value={item.id}>
              {item.name}
            </option>
            );
          } else if (control === "cities") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "trainclasses") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "trainRoutes") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "zones") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "agents") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } 
          else if (control === "bus_types") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          }  else if (control === "users") {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
          }  else if (control === "car_categories") {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
          }  else if (control === "car_brands") {
              return (
                <option key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </option>
              );
          }  else if (control === "operators") {
              return (
                <option key={item.id} value={item.id}>
                {item.name}
              </option>
              );
          }  else if (control === "busses") {
              return (
                <option key={item.id} value={item.id}>
                {item.bus_number}
              </option>
              );
          }  else if (control === "currencies") {
              return (
                <option key={item.id} value={item.id}>
                {item.name}
              </option>
              );
          }  else if (control === "trainTypes") {
              return (
                <option key={item.id} value={item.id}>
                {item.name}
              </option>
              );
          } else {
            return null; 
          }
        })}
      </select>
    </div>
  );
};

export default InputArrow;
