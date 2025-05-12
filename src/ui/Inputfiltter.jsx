import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import { components } from 'react-select';

const Inputfiltter = ({ placeholder, value, like, onChange, name, shara }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        if (name === 'type') {
          setOptions([
            { value: 'bus', label: 'bus' },
            { value: 'hiace', label: 'hiace' }
          ]);
        } else if (name === 'three') {
          setOptions([
            { value: 'bus', label: 'bus' },
            { value: 'hiace', label: 'hiace' },
            { value: 'train', label: 'train' }
          ]);
        } else if (name === 'two') {
          setOptions([
            { value: 'fixed', label: 'fixed' },
            { value: 'percentage', label: 'percentage' }
          ]);
        } else if (name === 'Limit') {
          setOptions([
            { value: 'limited', label: 'limited' },
            { value: 'unlimited', label: 'unlimited' }
          ]);
        } else if (name === 'swticher') {
          setOptions([
            { value: 'Default', label: 'Default' },
            { value: 'Private', label: 'Private' }
          ]);
        } else {
          const res = await axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          let data = [];

          if (name === 'cities') {
            data = res.data.cities
              .filter(item => item.country_id == shara)
              .map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'zones') {
            data = res.data.zones
              .filter(item => item.city_id == shara)
              .map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'stations') {
            if (placeholder === "Pickup Station") {
              data = res.data.pickup.map(item => ({ value: item.id, label: item.name }));
            } else {
              data = res.data.dropoff.map(item => ({ value: item.id, label: item.name }));
            }
          } else if (name === 'countries') {
            data = res.data.countries.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'bus_types') {
            data = res.data.bus_type.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'agents') {
            data = res.data.agents.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'car_brands') {
            data = res.data.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'car_models') {
            data = res.data.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'trains') {
            data = res.data.train.map(item => ({ value: item.id, label: item.name }));
          } else if (name === 'hiaces') {
            data = res.data.hiaces.map(item => ({ value: item.id, label: item.agent_name }));
          } else if (name === 'busses') {
            data = res.data.buses.map(item => ({
              value: item.id,
              label: `number ${item.bus_number} name ${item.bus_type_name}`
            }));
          }

          setOptions(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name, shara, placeholder]);

  const selectedOption = options.find(option => option.value === value) || null;

// const shape = like
//   ? "absolute  z-1 top-[60%] left-42 md:left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
//   : "absolute    z-1 top-[60%] right-4 md:right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

  return (
  <div className="relative group flex flex-col gap-3 items-start justify-center">
        {/* <IoIosArrowDown className={shape} /> */}
        <span className='font-bold  text-one'>{placeholder}</span>
      <Select
        options={options}
        value={selectedOption}
        onChange={selected => {
          const syntheticEvent = {
            target: {
              name,
              value: selected ? selected.value : ''
            }
          };
          onChange(syntheticEvent);
        }}
      placeholder={` ${placeholder}`}
        isSearchable
        isClearable={false}
        classNames={{
          control: () => "  w-50 h-12 md:w-[300px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10",
          menu: () => ' bg-white border border-gray-200 rounded-md mt-1',
          option: ({ isFocused }) =>
            isFocused ? 'bg-gray-100 px-4 py-2 cursor-pointer' : 'px-4 py-2 cursor-pointer',
        }}
          components={{ DropdownIndicator }}

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
export default Inputfiltter;
