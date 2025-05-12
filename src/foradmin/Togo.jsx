import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation,Navigate } from 'react-router-dom';
import Dash from '../pages/Dash/Dash.jsx';
import Home from '../pages/Home/Home.jsx';
import User from '../pages/User/User.jsx';
import Userbookingdetails from '../pages/User/Userbookingdetails.jsx';
import AddUser from '../pages/User/AddUser.jsx';
import UserDetails from '../pages/User/UserDetails.jsx';
import Location from '../pages/Location/Location.jsx';
import Buses from '../pages/Buses/Buses.jsx';
import Booking from '../pages/Booking/Booking.jsx';
// import Bookingdetails from '../pages/Booking/Addbooking/Bookingdetails.jsx';
import Bookingdetailsmore from '../pages/Booking/Addbooking/Bookingdetailsmore.jsx';
import Trips from '../pages/Trips/Trips.jsx';
import AddTrips from '../pages/Trips/AddTrips.jsx';
import Hiace from '../pages/hies/Minivan.jsx';
import Addhiace from '../pages/hies/MinivanAdd.jsx';

import Agents from '../pages/Agents/Agents.jsx';
import AddAgents from '../pages/Agents/AddAgents.jsx'
//
import Complaints from '../pages/Complaints/Complaints.jsx';
import AddComplaints from '../pages/Complaints/AddComplaints.jsx';
//
import CommissionSetup from '../pages/Commission/Commission.jsx';
import AddCommissionSetup from '../pages/Commission/AddCommission.jsx';
//
import Currency from '../pages/Currency/Currency.jsx';
import AddCurrency from '../pages/Currency/AddCurrency.jsx';
//
import Allpayot from '../pages/Payout/Allpayot.jsx';
import HistoryPayout from '../pages/Payout/HistoryPayout.jsx';
import Cancelpayout from '../pages/Payout/Cancelpayout.jsx';

//
import Financial from '../pages/Financial/Financial.jsx';
import Settings from '../pages/Settings/Settings.jsx';
import Car from '../pages/Car/Car.jsx';
import Homes from '../pages/Dashbrod/Homes.jsx'
import Train from '../pages/Tarins/Tarin.jsx'
const Togo = ({ setIsLoggedIn }) => {
  const [activeLink, setActiveLink] = useState('/');
  const [open, setopen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === '/AddUser'
      || location.pathname === '/UserDetails'
      || location.pathname === '/Userbookingdetails'

    ) {
      setActiveLink('/User');
    } else if (location.pathname === '/Location/Cities' || location.pathname === '/Location/Zones' || location.pathname === '/Location/Stations' || location.pathname === '/Location/Addcountries' || location.pathname === '/Location/Addcities' || location.pathname === '/Location/Addzones' || location.pathname === '/Location/AddOffStation') {
      setActiveLink('/Location');
    } 
    else if (location.pathname === '/Buses/TypeBuses' || location.pathname === '/Buses/AddBusesHistory' 
      || location.pathname === '/Buses/Operation'
      || location.pathname === '/Buses/BusesHistory'
       || location.pathname === '/Buses/AddBuses' || location.pathname === '/Buses/AddTypeBuses') {
      setActiveLink('/Buses');
    }
    
    else if (location.pathname === '/Car/BRANDS' || location.pathname === '/Car/MODELS' || location.pathname === '/Car/CARS' || 
      location.pathname === '/Car/AddCaetogries' || location.pathname === '/Car/AddBRANDS' || location.pathname === '/Car/AddMODELS' || location.pathname === '/Car/AddCARS') {
      setActiveLink('/Car');
    }
     else if (location.pathname === '/Booking/BookingHistory' || location.pathname === '/Booking/CurrentBookings'
      || location.pathname === '/Booking/CanceledBooking'
      || location.pathname === '/Bookingdetails'
      || location.pathname === '/Bookingdetailsmore'
    ) {
      setActiveLink('/Booking');
    } else if (location.pathname === '/Trips' || location.pathname === '/AddTrips') {
      setActiveLink('/Trips');

      //
    } else if (location.pathname === '/Train/AddTraintype' || location.pathname === '/Train/TrainClass' || location.pathname === '/Train/AddTrainClass' || location.pathname === '/Train/TrainRoute' || location.pathname === '/Train/AddTrainRoute'
      || location.pathname === '/Train/Trains' || location.pathname === '/Train/Addtrains'
    ) {
      setActiveLink('/Train');

    } else if (location.pathname === '/Agents' || location.pathname === '/AddAgents') {
      setActiveLink('/Agents');
    } else if (location.pathname === '/Complaints' || location.pathname === '/AddComplaints') {
      setActiveLink('/Complaints');
    } else if (location.pathname === '/Commission' || location.pathname === '/AddCommission') {
      setActiveLink('/Commission');
    } else if (location.pathname === '/Currency' || location.pathname === '/AddCurrency') {
      setActiveLink('/Currency');
    } else if (location.pathname === '/Allpayot' ||
      location.pathname === '/HistoryPayout' ||
      location.pathname === '/Cancelpayout'
    ) {
      setActiveLink('/Allpayot');
    } else if (location.pathname === '/Financial') {
      setActiveLink('/Financial');
    } else if (location.pathname === '/PaymentMethods' || location.pathname === '/CancellationPolicy') {
      setActiveLink('/Settings');
    } else if (location.pathname === '/Settings/AddPaymentMethods') {
      setActiveLink('/Settings/PaymentMethods');
    } else if (location.pathname === '/Settings/AddNationality') {
      setActiveLink('/Settings/Nationality');
    } else if (location.pathname === '/Settings/AddSubjectComplaints') {
      setActiveLink('/Settings/SubjectComplaints');
    } 
    else if (location.pathname === '/Settings/AddOperatorPayment') {
      setActiveLink('/Settings/OperatorPayment');
    }
    else if (location.pathname === '/Settings/AddFees') {
      setActiveLink('/Settings/Fees');
    }
    else if (location.pathname === '/MinivanAdd') {
      setActiveLink('/Minivan');
    }
     else if (location.pathname === '/Tarins/Tarin') {
      setActiveLink('/Tarins/Tarin');
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className='flex overflow-hidden relative'>
      <div className='bg-one  '>
        <Dash activeLink={activeLink}  setopen={setopen} open={open} />
      </div>
      <div className='w-full '>
        <Home setIsLoggedIn={setIsLoggedIn} setopen={setopen} open={open} />
        <Routes >
          <Route path='/login' element={<Navigate to="/Homes"/>} />
          {/* <Route path='/login' element={<Navigate to="/Home"/>} /> */}
          <Route path='/Homes' element={<Homes/>} />
          <Route path='/User' element={<User />} />
          <Route path='/Userbookingdetails' element={<Userbookingdetails />} />
          <Route path='/AddUser' element={<AddUser />} />
          <Route path='/UserDetails' element={<UserDetails />} />
          <Route path='/Buses/*' element={<Buses />} />
          <Route path='/Location/*' element={<Location />} />
          <Route path='/Booking/*' element={<Booking />} />
          {/* <Route path='/Bookingdetails' element={<Bookingdetails />} /> */}
          <Route path='/Bookingdetailsmore' element={<Bookingdetailsmore />} />
          <Route path='/Trips' element={<Trips />} />
          <Route path='/AddTrips' element={<AddTrips />} />
          <Route path='/Agents' element={<Agents />} />
          <Route path='/AddAgents' element={<AddAgents />} />
          <Route path='/Complaints' element={<Complaints />} />
          <Route path='/AddComplaints' element={<AddComplaints />} />
          {/*  */}
          <Route path='/Car/*' element={<Car />} />
          <Route path='/Train/*' element={<Train />} />
          {/*  */}

          <Route path='/Minivan' element={<Hiace />} />
          <Route path='/MinivanAdd' element={<Addhiace/>} />

          <Route path='/Commission' element={<CommissionSetup />} />
          <Route path='/AddCommission' element={<AddCommissionSetup />} />
          <Route path='/Currency' element={<Currency />} />
          <Route path='/AddCurrency' element={<AddCurrency />} />
          <Route path='/Allpayot' element={<Allpayot />} />
          <Route path='/HistoryPayout' element={<HistoryPayout />} />
          <Route path='/Cancelpayout' element={<Cancelpayout />} />
          <Route path='/Financial/*' element={<Financial />} />
          <Route path='/Settings/*' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Togo;
