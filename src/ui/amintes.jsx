import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '48px',
    height: 'auto',
    borderColor: '#ccc',
    borderRadius: '8px',
    paddingLeft: '10px',
    fontSize: '14px',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3b82f6',
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

const Aminites = ({ selectedDays, setSelectedDays }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("https://bcknd.ticket-hub.net/api/admin/aminites", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      const options = response.data.aminty.map(item => ({
        label: item.name,
        value: item.id
      }));
      setData(options);
    })
    .catch(error => {
      console.error("Error fetching amenities:", error);
    });
  }, []);

  const handleDayChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
    setSelectedDays(selectedValues); // هنا بتتخزن ids فقط
  };

  const selectedValues = data.filter(option => selectedDays.includes(option.value));

  return (
    <Select
      id="options"
      options={data}
      isMulti
      value={selectedValues}
      onChange={handleDayChange}
      placeholder="ِAminites"
      styles={customStyles}
      className="w-[200px] md:w-[300px]"
    />
  );
};

export default Aminites;
