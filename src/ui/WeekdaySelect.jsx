import Select from 'react-select';
import React from 'react';
const daysOptions = [
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
];

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
    backgroundColor: '#3b82f6', // bg-blue-500
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

const WeekdaySelect = ({ selectedDays, setSelectedDays }) => {
  const handleDayChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
    setSelectedDays(selectedValues);
  };

  const selectedValues = daysOptions.filter(option => selectedDays.includes(option.value));

  return (
    <Select
      id="options"
      options={daysOptions}
      isMulti
      value={selectedValues}
      onChange={handleDayChange}
      placeholder="Weekdays"
      styles={customStyles}
      className="w-[200px] md:w-[300px]"
    />
  );
};
export default WeekdaySelect;