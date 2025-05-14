import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { IoIosArrowDown } from "react-icons/io";

const InputArrow = ({ placeholder, value, onChange, name ,like}) => {
  const [options, setOptions] = useState([]);

  const mapDataToOptions = (data) => {
    return data.map(item => ({
      value: item.id || item.category_id,
      label: item.name || item.category_name || item.bus_number,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      let data = [];
      if (name === "countries") data = response.data.countries;
      else if (name === "cities") data = response.data.cities;
      else if (name === "zones") data = response.data.zones;
      else if (name === "users") data = response.data.users;
      else if (name === "car_categories") data = response.data;
      else if (name === "car_brands") data = response.data;
      else if (name === "operators") data = response.data.operators;
      else if (name === "busses") data = response.data.buses;
      else if (name === "currencies") data = response.data.currancies;
      else if (name === "trainTypes") data = response.data.trainTypes;
      else if (name === "trainRoutes") data = response.data.routes;
      else if (name === "trainclasses") data = response.data.trainClasses;
      else if (name === "agents") data = response.data.agents;
      else if (name === "point") data = response.data.currencies;
      else if (name === "currency_point") data = response.data.currencies;

      setOptions(mapDataToOptions(data));
    })
    .catch(error => {
      console.error('Error fetching  data:', error);
    });
  }, [name]);

// const shape = like
//   ? "absolute  z-1 top-[60%] left-42 md:left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
//   : "absolute    z-1 top-[60%] right-4 md:right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

  return (
    <div className="relative group flex flex-col gap-3 items-start justify-center">
       {/* <IoIosArrowDown className={shape} /> */}
       <span className='font-bold  text-one'>{placeholder}</span>
      <Select
        options={options}
        value={options.find(option => option.value === value)}
        onChange={(selected) => {
          onChange({ target: { value: selected?.value, name } });
        }}
        placeholder={` ${placeholder}`}
        isSearchable
        isClearable={false}
        classNames={{
          control: () => "Z-2  w-50 h-12 md:w-[300px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10",
          menu: () => ' bg-white border border-gray-200 rounded-md mt-1',
          option: ({ isFocused }) =>
            isFocused ? 'bg-gray-100 px-4 py-2 cursor-pointer' : 'px-4 py-2 cursor-pointer',
        }}
        styles={{
          // dropdownIndicator: () => ({ display: 'none' }),
          indicatorSeparator: () => ({ display: 'none' }),
          control: (base) => ({
            ...base,
            boxShadow: 'none',
            borderColor: '#E0E0E0',
            ':hover': {
              borderColor: '#999',
            },
            cursor: 'pointer',
          }),
          singleValue: (base) => ({
            ...base,
            color: '#333',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#aaa',
          }),
        }}
        noOptionsMessage={() =>"No Results "}
      />
    </div>
  );
};

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowDown
        size={20}
        color="#888"
        style={{
          transform: menuIsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      />
    </components.DropdownIndicator>
  );
};

export default InputArrow;
