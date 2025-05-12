import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

 const InputOperatorer = ({ placeholder, value, like, onChange, name, shara }) => {
  const [arrThing, setArrthing] = useState([]);
  const [control, setControl] = useState(name);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (name === "type") {
      const typeArray = [
        { name: "bus" },
        { name: "hiace" }]
      setArrthing(typeArray)
    }
    if (name === "three") {
      const typeArray = [
        { name: "bus" },
        { name: "hiace" },
        { name: "train" }]
      setArrthing(typeArray)
    }
    if (name === "two") {
      const typeArray = [
        { name: "fixed" },
        { name: "percentage" }]
      setArrthing(typeArray)
    }
    if (name === "Limit") {
      const typeArray = [
        { name: "limited" },
        { name: "unlimited" }]
      setArrthing(typeArray)
    }
    if (name === "swticher") {
      const typeArray = [
        { name: "Default" },
        { name: "Private" }]
      setArrthing(typeArray)
    }
    if (name === "cities" || name === "zones" || name === "countries" || name === "bus_types"
      || name === "agents" || name === 'car_brands' 
      || name === "car_models" || name === "stations"
      ||name==="trains"
    ||name==="hiaces"||name==="busses") {
      axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          if (name === "cities") {

            const filteredCities = response.data.cities
              .filter(city => city.country_id == shara)
              .map(city => ({
                name: city.name,
                id: city.id,
              }));

            setArrthing(filteredCities);
          } else if (name === "zones") {
            const filteredZones = response.data.zones
              .filter(city => city.city_id == shara)
              .map(city => ({
                name: city.name,
                id: city.id,
              }));
            setArrthing(filteredZones);
          } else if (name === "stations") {
            let filteredZones = response.data;
            if(placeholder === "Pickup Station") {
               filteredZones = response.data.pickup
            }else(placeholder==="Dropoff Station")
            {
               filteredZones = response.data.dropoff
            }
        //     filteredZones.filter(zone => zone.zone_id == shara)
        // .map(zone => ({
        //   name: zone.name,
        //   id: zone.id,
        // }));
      setArrthing(filteredZones);

    } else if (name === "countries") {
      setArrthing(response.data.countries);

    }
    else if (name === "bus_types") {
      setArrthing(response.data.bus_type);
    }
    else if (name === "agents") {
      setArrthing(response.data.agents);
    }
    else if (name === "car_brands") {
      setArrthing(response.data);
    }
    else if (name === "car_models") {
      setArrthing(response.data);
    }
    else if (name === "trains") {
      setArrthing(response.data.train);
    }
    else if (name === "hiaces") {
      setArrthing(response.data.hiaces);
    }
    else if (name === "busses") {
      setArrthing(response.data.buses);
    }

  })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
  }, [name, shara]);

const shape = like
  ? "absolute top-[60%] left-42 md:left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
  : "absolute top-[60%] right-4 md:right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

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
      className=" w-50 h-12 md:w-[300px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10"
    >
      <option value="">{placeholder}</option> {/* قيمة افتراضية */}
      {arrThing && arrThing.length > 0 && arrThing.map((item, index) => {
        if (control === "countries") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        } else if (control === "cities") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        } else if (control === "zones") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "bus_types") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "agents") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "type") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "three") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "Limit") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "swticher") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "two") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "car_brands") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "car_models") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "stations") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "trains") {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        }
        else if (control === "hiaces") {
          return (
            <option key={index} value={item.id}>
              {item.agent_name}
            </option>
          );
        }
        else if (control === "busses") {
          return (
            <option key={index} value={item.id}>
            {`numbre ${item.bus_number} name ${item.bus_type_name}`}  
            </option>
          );
        }
        else {
          return null;
        }
      })}
    </select>
  </div>
);
};

export default InputOperatorer;