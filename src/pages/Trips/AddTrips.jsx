import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwitchButton from '../../ui/SwitchButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Inputfiltter from '../../ui/Inputfiltter';
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import WeekdaySelect from '../../ui/WeekdaySelect';
const AddTrips = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [tripName, setTripName] = useState('');
  const [busId, setBusId] = useState('');
  const [train_id, settrain_id] = useState('');
  const [pickupStationId, setPickupStationId] = useState('');
  const [dropoffStationId, setDropoffStationId] = useState('');
  const [cityId, setCityId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [countryId, setCountryId] = useState('');
  const [toCountryId, setToCountryId] = useState('');
  const [toCityId, setToCityId] = useState('');
  const [toZoneId, setToZoneId] = useState('');
  const [date, setDate] = useState("");
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState("inactive");
  const [agentId, setAgentId] = useState('');
  const [maxBookDate, setMaxBookDate] = useState();
  const [type, setType] = useState('');
  const [fixedDate, setFixedDate] = useState();
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [cancellationPayAmount, setCancellationPayAmount] = useState('');
  const [cancellationPayValue, setCancellationPayValue] = useState('');
  const [minCost, setMinCost] = useState('');
  const [tripType, setTripType] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [datastart, setdatastart] = useState('');
  // const [cancellationDate, setCancellationDate] = useState();
  const [selectedDays, setSelectedDays] = useState([]);
    const [edit, setEdit] = useState(false);
useEffect(()=>{
  console.log(selectedDays)
},[selectedDays])
  
  const [errors, setErrors] = useState({
    tripName: '',
    busId: '',
    train_id: '',
    pickupStationId: '',
    dropoffStationId: '',
    cityId: '',
    zoneId: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: '',
    countryId: '',
    toCountryId: '',
    toCityId: '',
    toZoneId: '',
    datastart: '',
    date: '',
    price: '',
    status: '',
    agentId: '',
    maxBookDate: '',
    type: '',
    day:"",
    fixedDate: '',
    cancellationPolicy: '',
    cancellationPayAmount: '',
    cancellationPayValue: '',
    minCost: '',
    tripType: '',
    currencyId: '',
    // cancellationDate: ''
  });
  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setTripName(sendData.name);
      setBusId(sendData.bus?.id); 
      settrain_id(sendData.train?.id); 
      setPickupStationId(sendData.route?.origin?.pickup_station?.id);
      setDropoffStationId(sendData.route?.destination?.dropoff_station?.id);
      setCityId(sendData.route?.origin?.city?.id);
      setdatastart(sendData.start_date);
      setZoneId(sendData.route?.origin?.zone?.id);
      setDepartureTime(sendData.departure_time);
      setArrivalTime(sendData.arrival_time);
      setAvailableSeats(sendData.available_seats);
      setCountryId(sendData.route?.origin?.country_id);
      setToCountryId(sendData.route?.destination?.country_id);
      setToCityId(sendData.route?.destination?.city?.id); 
      setToZoneId(sendData.route?.destination?.zone?.id);
      setDate(sendData.date);
      setPrice(sendData.price);
      setStatus(sendData.status);
      setAgentId(sendData.agent?.id);
      setMaxBookDate(sendData.max_booking_date);
      setType(sendData.type);
      if(sendData.type)setSelected("B")
      setFixedDate(sendData.fixed_date);
      setCancellationPolicy(sendData.cancellation_policy?.policy);
      setCancellationPayAmount(sendData.cancellation_policy?.pay_amount);
      setCancellationPayValue(sendData.cancellation_policy?.pay_value);
      setMinCost(sendData.min_cost);
      setTripType(sendData.trip_type);
      setCurrencyId(sendData.currency_id);
      setSelectedDays(() => {
        const selected = sendData.days.map(day => day);
  setSelectedDays(() => {
    const combined =selected
    return Array.from(new Set(combined));
  });
      });
      setdatastart(sendData.start_date);
      setEdit(true);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [location.state]);
  const handleChangetwo = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setToCountryId(value);
    if (name === 'cities') setToCityId(value);
    if (name === 'zones') setToZoneId(value);
    if (name === 'stations') setDropoffStationId(value);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'trip_name') setTripName(value);
    if (name === 'cities') setCityId(value);
    if (name === 'countries') setCountryId(value);
    if (name === 'zones') setZoneId(value);
    if (name === 'stations') setPickupStationId(value);
    if (name === 'avalible_seats') setAvailableSeats(value);
    if (name === 'price') setPrice(value);
    if (name === 'status') setStatus(value);
    if (name === 'operators') setAgentId(value);
    if (name === 'maxBookDate') setMaxBookDate(value);
    if (name === 'Limit') setType(value);
    if (name === 'cancellation_policy') setCancellationPolicy(value);
    if (name === 'two') setCancellationPayAmount(value);
    if (name === 'cancelation_pay_value') setCancellationPayValue(value);
    if (name === 'min_cost') setMinCost(value);
    if (name === 'three') setTripType(value);
    if (name === 'currencies') setCurrencyId(value);
    if (name === 'busses'||name==="hiaces") setBusId(value);
    if (name === 'trains') settrain_id(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!tripName) formErrors.tripName = 'Trip name is required';
    if(tripType==="bus" && !busId) formErrors.busId = 'Bus ID is required';
    if(tripType==="hiace" && !busId) formErrors.busId = 'hiace ID is required';
    if(tripType==="train" && !train_id) formErrors.busId = 'train ID is required';
    if (!pickupStationId) formErrors.pickupStationId = 'Pickup station ID is required';
    if (!dropoffStationId) formErrors.dropoffStationId = 'Dropoff station ID is required';
    if (!cityId) formErrors.cityId = 'City ID is required';
    if (!zoneId) formErrors.zoneId = 'Zone ID is required';
    if (!departureTime) formErrors.departureTime = 'Departure time is required';
    if (!arrivalTime) formErrors.arrivalTime = 'Arrival time is required';
    if (!availableSeats) {
      formErrors.availableSeats = 'Available seats are required';
    } else if (isNaN(availableSeats)) {
      formErrors.availableSeats = 'Available seats must be a number';
    }
    if (!countryId) formErrors.countryId = 'Country ID is required';
    if (!toCountryId) formErrors.toCountryId = 'To country ID is required';
    if (!toCityId) formErrors.toCityId = 'To city ID is required';
    if (!toZoneId) formErrors.toZoneId = 'To zone ID is required';
    if (!price) formErrors.price = 'Price is required';
    if (!agentId) formErrors.agentId = 'Agent ID is required';
    if (!maxBookDate) {
      formErrors.maxBookDate = 'Max book date is required';
    } else if (isNaN(maxBookDate)) {
      formErrors.maxBookDate = 'Max book date should be a number';
    }
   
    if (selected==="A"&&!date) formErrors.date = 'Date is required';
    if (selected==="B"&& !type) formErrors.type = 'Recurrent Type is required';
    if (selected==="B"&& !datastart) formErrors.datastart = 'start date is required';
    if (selected==="B"&& !selectedDays) formErrors.selectedDays = 'selectedDays  is required';
    if (!fixedDate) formErrors.fixedDate = 'Fixed date is required';
    if (!cancellationPolicy) formErrors.cancellationPolicy = 'Cancellation policy is required';
    if (!cancellationPayAmount) formErrors.cancellationPayAmount = 'Cancellation pay amount is required';
    if (!cancellationPayValue) formErrors.cancellationPayValue = 'Cancellation pay value is required';
    if (!minCost) formErrors.minCost = 'Min cost is required';
    if (!tripType) formErrors.tripType = 'Trip type is required';
    if (!currencyId) formErrors.currencyId = 'Currency ID is required';
    // if (!cancellationDate) formErrors.cancellationDate = 'Cancellation date is required';
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };
  const handleDatePickerChange = (newData) => {
    if (newData) {
      const day = newData.getDate() ;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setDate(formattedDate);
    } else {
      setDate("");
    }
  };
  const handlehandlemaxBookDate = (newData) => {
    if (newData) {
      const day = newData.getDate() ;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setFixedDate(formattedDate);
    } else {
      setFixedDate("");
    }
  };
  // const handleCancellationDate = (newData) => {
  //   if (newData) {
  //     const day = newData.getDate() + 1;
  //     const month = newData.getMonth() + 1;
  //     const year = newData.getFullYear();

  //     const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  //     setCancellationDate(formattedDate);
  //   } else {
  //     setCancellationDate("");
  //   }
  // };
  const handstartDate = (newData) => {
    if (newData) {
      const day = newData.getDate() ;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setdatastart(formattedDate);
    } else {
      setdatastart("");
    }
  };
  const handledepartureTime = (newTime) => {
    if (newTime) {
      const formattedTime = newTime;
      console.log("Departure Time: ", formattedTime);
      setDepartureTime(formattedTime);
    } else {
      setDepartureTime(""); // في حالة حذف الوقت
    }
  };
  const handlearrivalTime = (newTime) => {
    if (newTime) {
      const formattedTime = newTime; // TimePicker سيعيد الوقت بتنسيق HH:mm
      setArrivalTime(formattedTime);
    } else {
      setArrivalTime(""); // في حالة حذف الوقت
    }
  };
  const [selected, setSelected] = useState("A");
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    const newTrip = {
      trip_name: tripName,
      pickup_station_id: pickupStationId,
      dropoff_station_id: dropoffStationId,
      city_id: cityId,
      zone_id: zoneId,
      //
      deputre_time: departureTime,
      arrival_time: arrivalTime,
      max_book_date: maxBookDate,
      //
      avalible_seats: availableSeats,
      country_id: countryId,
      to_country_id: toCountryId,
      to_city_id: toCityId,
      to_zone_id: toZoneId,
      price,
      status,
      start_date:datastart,
      agent_id: agentId,
      
      fixed_date: fixedDate,
      cancellation_policy: cancellationPolicy,
      cancelation_pay_amount: cancellationPayAmount,
      cancelation_pay_value: cancellationPayValue,
      min_cost: minCost,
      trip_type: tripType,
      currency_id: currencyId,
      // cancelation_date: cancellationDate,
      train_id: train_id,
      bus_id: busId,
    }

    if(selected==="A")
    newTrip.date=date
    
    if(selected==="B"){
    
        newTrip.start_date=datastart,
        newTrip.type=type,
newTrip.day=selectedDays,
        newTrip.type=type
      
    }
        

    if(tripType==="bus"){
        newTrip.bus_id=busId}
      else if(tripType==="hiace"){
          newTrip.bus_id=busId}
        else if(tripType==="train"){
          newTrip.train_id=train_id
        }
        console.log("Selected Days:", selectedDays);

    if (edit) {
      const { sendData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/trip/update/${sendData.id}`, newTrip, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('Trip updated successfully');
          setTimeout(() => {
            navigate('/Trips');
          }, 2000);
        })
       
      return;
    }
    axios.post('https://bcknd.ticket-hub.net/api/admin/trip/add', newTrip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Trip added successfully');

        setTimeout(() => {
          navigate('/Trips');
        }, 2000);
      })
      .catch(() => {
      });
      setdatastart('')
    setTripName('');
    setBusId('');
    setPickupStationId('');
    setDropoffStationId('');
    setCityId('');
    setZoneId('');
    setDepartureTime('');
    setArrivalTime('');
    setAvailableSeats('');
    setCountryId('');
    setToCountryId('');
    setToCityId('');
    setToZoneId('');
    setDate('');
    setPrice('');
    setStatus('');
    setAgentId('');
    setMaxBookDate('');
    setType('');
    setFixedDate('');
    setCancellationPolicy('');
    setCancellationPayAmount('');
    setCancellationPayValue('');
    setMinCost('');
    setTripType('');
    setCurrencyId('');
    // setCancellationDate('');
    setEdit(false);
    setSelectedDays([])
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>
      <AddAll navGo='/Trips' name='add Trips' />
      <div className="flex flex-wrap gap-6 mt-6">
<div className='w-full flex-col  '>
  <h2 className='text-2xl text-one  font-bold'>Trip Information</h2>
  <div className='flex w-full mt-4 flex-wrap gap-1.5 justify-start'>
  <InputField
          placeholder="Trip Name"
          name="trip_name"
          value={tripName}
          onChange={handleChange}
          required
        />
          <Inputfiltter
          placeholder="Trip Type"
          name="three"
          value={tripType}
          onChange={handleChange}
          required
        />
         {tripType==="bus" &&(
          <Inputfiltter
          placeholder="bus"
          name="busses"
          value={busId}
          onChange={handleChange}
          required
        />
      )}
      {tripType==="hiace"&&(
          <Inputfiltter
          placeholder="hiaces"
          name="hiaces"
          value={busId}
          onChange={handleChange}
          required
        />
      )}
       {tripType==="train" &&(
          <Inputfiltter
          placeholder="trains "
          name="trains"
          value={train_id}
          onChange={handleChange}
          required
        />
      )}
  </div>
</div>
<div className='w-full flex-col  '>
  <h2 className='text-2xl text-one  font-bold'>Location Information</h2>
  <div>

  <div className='flex w-full mt-4 flex-wrap gap-2 justify-start'>
  <InputArrow
          placeholder="from Country "
          name="countries"
          value={countryId}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          placeholder=" from City "
          name="cities"
          value={cityId}
          onChange={handleChange}
          shara={countryId}
          required
        />
        <Inputfiltter
          placeholder="from Zone "
          name="zones"
          value={zoneId}
          onChange={handleChange}
          shara={cityId}
          required
        />
        


        <InputArrow
          placeholder="To Country"
          name="countries"
          value={toCountryId}
          onChange={handleChangetwo}
          required
        />
        <Inputfiltter
          placeholder="To City "
          name="cities"
          value={toCityId}
          onChange={handleChangetwo}
          shara={toCountryId}
          required
        />
        <Inputfiltter
          placeholder="To Zone "
          name="zones"
          value={toZoneId}
          shara={toCityId}
          onChange={handleChangetwo}
          required
        />
    
  </div>
  </div>
         </div>
         <div className='w-full flex-col  '>
         <h2 className='text-2xl text-one  font-bold'>PickUp & DropOff Information </h2>
         <div className='flex w-full mt-4 flex-wrap gap-2 justify-start'>
         <Inputfiltter
          placeholder="Pickup Station"
          name="stations"
          shara={zoneId}
          value={pickupStationId}
          onChange={handleChange}
          required
        />
            <Inputfiltter
          placeholder="Dropoff Station"
          name="stations"
          shara={toZoneId}
          value={dropoffStationId}
          onChange={handleChangetwo}
          required
        />
           <InputField
          placeholder="Available Seats"
          name="avalible_seats"
          value={availableSeats}
          onChange={handleChange}
          required
        />
     
</div>
</div>
        <div className='w-full flex-col  '>
         <h2 className='text-2xl text-one  font-bold'>Schedule </h2>
         <div className="flex space-x-2 items-center gap-5 mt-2">
          <spna>Schedule Type:</spna>
      <button
        onClick={() => setSelected("A")}
        className={`px-4 py-2 rounded-lg border ${
          selected === "A"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        One Time 
      </button>
      <button
        onClick={() => setSelected("B")}
        className={`px-4 py-2 rounded-lg border ${
          selected === "B"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        Recurrent 
      </button>
    </div>
    {selected === "B" && ( 
      <div className='flex w-full mt-4  flex-col md:flex-row md:flex-wrap gap-2 justify-start'>
         <Inputfiltter
          placeholder="Recurrent Type"
          name="Limit"
          value={type}
          onChange={handleChange}
          required
        />
         <InputField
          placeholder="maxBookDate"
          name="maxBookDate"
          value={maxBookDate}
          onChange={handleChange}
          required
        />

     <div className='flex  justify-between items-end w-[200px] md:w-[300px]'>
     <WeekdaySelect selectedDays={selectedDays} setSelectedDays={setSelectedDays} />

     </div>

         <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven  pl-0 md:pl-10'>
        <span className='text-[12px] md:text-[16px]'>arrivalTime</span>
          <TimePicker
            onChange={handlearrivalTime}
            value={arrivalTime}
            format="HH:mm"
            disableClock={true}
            disableCalendar={false}
          />
        </div>
        
          <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven   pl-0 md:pl-10'>
          <span className='text-[12px] md:text-[16px]'>departure Time </span>

          <TimePicker
            onChange={handledepartureTime}
            value={departureTime}
            format="HH:mm"
            disableClock={true}
          />
        </div>
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven   pl-0 md:pl-10'>
          <span className='text-[12px] md:text-[16px]'>Start date</span>
          <DatePicker 
            onChange={handstartDate}
            value={datastart}
            format="dd-MM-yyyy" 
            disableClock={true}
            disableCalendar={false}
            minDate={new Date()} // يمنع اختيار أي تاريخ قبل النهارده
          />
        </div>
       

   
        </div>)}
        {selected === "A" && ( 
      <div className='flex w-full mt-4 flex-wrap gap-2 justify-start'>
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-0 md:pl-10'>
        <span className='text-[12px] md:text-[16px]'>date</span>
          <DatePicker
            onChange={handleDatePickerChange}
            value={date}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
            minDate={new Date()} // يمنع اختيار أي تاريخ قبل النهارده

          />
        </div>
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven   pl-0 md:pl-10'>
          <span className='text-[12px] md:text-[16px]'>departure Time </span>
          <TimePicker
            onChange={handledepartureTime}
            value={departureTime}
            format="HH:mm"
            disableClock={true}
          />
        </div>
         <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven  pl-0 md:pl-10'>
        <span className='text-[12px] md:text-[16px]'>arrivalTime</span>
          <TimePicker
            onChange={handlearrivalTime}
            value={arrivalTime}
            format="HH:mm"
            disableClock={true}
            disableCalendar={false}
          />
        </div>
         
        <div className='w-full flex justify-start items-center'>

        <InputField
          placeholder="maxBookDate"
          name="maxBookDate"
          value={maxBookDate}
          onChange={handleChange}
          required
        />
        </div>
        </div>)}
        </div>
<div className='w-full flex-col  '>
  <h2 className='text-2xl text-one  font-bold'>Pricing & Cancellation</h2>
  <div>
  <div className='flex w-full mt-4 flex-wrap gap-2 justify-start'>
 
        <InputField
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="Agent "
          name="operators"
          value={agentId}
          onChange={handleChange}
          required
        />
        <div className=' flex justify-center items-end'>

         <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-2'>
        <span className='text-[12px] md:text-[16px]'>Fixed Date</span>
          <DatePicker
            onChange={handlehandlemaxBookDate}
            value={fixedDate}
            format="dd-MM-yyyy"
            disableClock={true}
            minDate={new Date()} // يمنع اختيار أي تاريخ قبل النهارده

            disableCalendar={false}
            />
        </div>
            </div>
</div>
<div className='flex w-full mt-4 flex-wrap gap-2 justify-start'>
<InputField
          placeholder="Cancellation Policy"
          name="cancellation_policy"
          value={cancellationPolicy}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          placeholder="Cancellation Pay Amount"
          name="two"
          value={cancellationPayAmount}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Cancellation Pay Value"
          name="cancelation_pay_value"
          value={cancellationPayValue}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Min Cost"
          name="min_cost"
          value={minCost}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="Currency"
          name="currencies"
          value={currencyId}
          onChange={handleChange}
          required
        />
                <div className=' flex justify-center items-end'>

        {/* <div className=' flex flex-col md:flex-row gap-0.5 md:gap-0 md:justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-0'>
        <span className='text-[12px] md:text-[16px]'>Cancellation Date </span>
          <DatePicker
            onChange={handleCancellationDate}
            value={cancellationDate}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
          />
        </div>   */}
        </div>  
  </div>
  </div>
         </div>
        <SwitchButton   value={status} setValue={setStatus} />
      </div>

      <div className="flex gap-3">
         <button onClick={handleSave}>
                   <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
                   </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTrips
