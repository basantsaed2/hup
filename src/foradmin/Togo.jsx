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
import  ErrorPage from '../ErrorPage.jsx'
import AdminRoles from '../pages/Adminroles/AdminRoles.jsx'
import AddAdminRoles from '../pages/Adminroles/AddAdminRoles.jsx'

import Admins from '../pages/Admins/Admins.jsx'
import AddAdmins from '../pages/Admins/AddAdmins.jsx'

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
import PrivateRequest from '../pages/PrivateRequest/PrivateRequest.jsx'
//
import Request from '../pages/Request/Request.jsx'
import ReedemPoint from '../pages/ReedemPoint/ReedemPoint.jsx'
import AddReedemPoint from '../pages/ReedemPoint/AddReedemPoint.jsx'

//
import Point from '../pages/Point/Point.jsx';
import AddPoint from '../pages/Point/AddPoint.jsx';
//
import Usersupplier from "../pages/Usersupplier/Usersupplier.jsx"
  //
import Wallet from '../pages/Walllet/Wallet.jsx';
  //
import Financial from '../pages/Financial/Financial.jsx';
import Settings from '../pages/Settings/Settings.jsx';
import Car from '../pages/Car/Car.jsx';
import Homes from '../pages/Dashbrod/Homes.jsx'
import Train from '../pages/Tarins/Tarin.jsx'

// import useModuleActions from '../Hooks/useModuleActions.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
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
    else if (location.pathname === '/Buses/TypeBuses' || location.pathname === '/Buses/Aminites' 
      || location.pathname === '/Buses/Operation'
      || location.pathname === '/Buses/AddAminites'
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

    } else if (location.pathname === '/Operators' || location.pathname === '/AddOperators') {
      setActiveLink('/Operators');
    } else if (location.pathname === '/Complaints' || location.pathname === '/AddComplaints') {
      setActiveLink('/Complaints');
    } else if (location.pathname === '/Commission' || location.pathname === '/AddCommission') {
      setActiveLink('/Commission');
    } else if (location.pathname === '/Currency' || location.pathname === '/AddCurrency') {
      setActiveLink('/Currency');
    } else if (location.pathname === '/PayoutAccount' ||
      location.pathname === '/HistoryPayout' ||
      location.pathname === '/Cancelpayout'
    ) {
      setActiveLink('/PayoutAccount');
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
    else if (location.pathname === '/AddReedemPoint' ) {
      setActiveLink('/ReedemPoint');
    }
  
    else if (location.pathname === '/AddPoint' ) {
      setActiveLink('/Point');
    }
     else if (location.pathname === '/Tarins/Tarin') {
      setActiveLink('/Tarins/Tarin');
    }
     else if (location.pathname === '/AddAdminRoles') {
      setActiveLink('/AdminRoles');
    }
     else if (location.pathname === '/AddAdmins') {
      setActiveLink('/Admins');
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className='flex overflow-hidden h-screen relative'>
      <div className='bg-one   '>
        <Dash activeLink={activeLink}  setopen={setopen} open={open} />
      </div>
      <div className='w-full overflow-auto '>
        <Home setIsLoggedIn={setIsLoggedIn} setopen={setopen} open={open} />
        <Routes >
          
          <Route path='/login' element={<Navigate to="/Homes"/>} />
          <Route path='/Homes' element={<Homes/>} />
          {/* <Route path='/User' element={<User />} /> */}
             <Route
            path='/User'
            element={
              <ProtectedRoute moduleName='user' requiredAction='view'>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
  path='/AddUser'
  element={
    <ProtectedRoute moduleName='user' requiredAction='add'>
      <AddUser />
    </ProtectedRoute>
  }
/>

<Route
  path='/UserDetails'
  element={
    <ProtectedRoute moduleName='user' requiredAction='view'>
      <UserDetails />
    </ProtectedRoute>
  }
/>

<Route
  path='/Userbookingdetails'
  element={
    <ProtectedRoute moduleName='user' requiredAction='view'>
      <Userbookingdetails />
    </ProtectedRoute>
  }
/>
          <Route path='/Location/*' element={<Location />} />

          <Route path='/Buses/*' element={<Buses />} />


          <Route path='/Car/*' element={<Car />} />

<Route
  path='/Booking/*'
  element={
    <ProtectedRoute moduleName='booking' requiredAction='view'>
      <Booking />
    </ProtectedRoute>
  }
/>

<Route
  path='/Bookingdetailsmore'
  element={
    <ProtectedRoute moduleName='booking' requiredAction='view'>
      <Bookingdetailsmore />
    </ProtectedRoute>
  }
/>

<Route
  path='/Trips'
  element={
    <ProtectedRoute moduleName='trips' requiredAction='view'>
      <Trips />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddTrips'
  element={
    <ProtectedRoute moduleName='trips' requiredAction='add'>
      <AddTrips />
    </ProtectedRoute>
  }
/>

<Route
  path='/Minivan'
  element={
    <ProtectedRoute moduleName='hiaces' requiredAction='view'>
      <Hiace />
    </ProtectedRoute>
  }
/>

<Route
  path='/MinivanAdd'
  element={
    <ProtectedRoute moduleName='hiaces' requiredAction='add'>
      <Addhiace />
    </ProtectedRoute>
  }
/>


          <Route path='/Train/*' element={<Train />} />


<Route
  path='/Operators'
  element={
    <ProtectedRoute moduleName='operators' requiredAction='view'>
      <Agents />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddOperators'
  element={
    <ProtectedRoute moduleName='operators' requiredAction='add'>
      <AddAgents />
    </ProtectedRoute>
  }
/>

<Route
  path='/Complaints'
  element={
    <ProtectedRoute moduleName='complaints' requiredAction='view'>
      <Complaints />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddComplaints'
  element={
    <ProtectedRoute moduleName='complaints' requiredAction='add'>
      <AddComplaints />
    </ProtectedRoute>
  }
/>

<Route
  path='/Commission'
  element={
    <ProtectedRoute moduleName='Commission' requiredAction='view'>
      <CommissionSetup />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddCommission'
  element={
    <ProtectedRoute moduleName='Commission' requiredAction='add'>
      <AddCommissionSetup />
    </ProtectedRoute>
  }
/>

<Route
  path='/Currency'
  element={
    <ProtectedRoute moduleName='currencies' requiredAction='view'>
      <Currency />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddCurrency'
  element={
    <ProtectedRoute moduleName='currencies' requiredAction='add'>
      <AddCurrency />
    </ProtectedRoute>
  }
/>

<Route
  path='/PayoutAccount'
  element={
    <ProtectedRoute moduleName='payoutRequest' requiredAction='view'>
      <Allpayot />
    </ProtectedRoute>
  }
/>

<Route
  path='/HistoryPayout'
  element={
    <ProtectedRoute moduleName='payoutRequest' requiredAction='add'>
      <HistoryPayout />
    </ProtectedRoute>
  }
/>

<Route
  path='/Cancelpayout'
  element={
    <ProtectedRoute moduleName='payoutRequest' requiredAction='view'>
      <Cancelpayout />
    </ProtectedRoute>
  }
/>

<Route
  path='/PrivateRequest'
  element={
    <ProtectedRoute moduleName='private_request' requiredAction='view'>
      <PrivateRequest />
    </ProtectedRoute>
  }
/>

<Route
  path='/Request'
  element={
    <ProtectedRoute moduleName='payoutRequest' requiredAction='view'>
      <Request />
    </ProtectedRoute>
  }
/>

<Route
  path='/ReedemPoint'
  element={
    <ProtectedRoute moduleName='redeem_point' requiredAction='view'>
      <ReedemPoint />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddReedemPoint'
  element={
    <ProtectedRoute moduleName='redeem_point' requiredAction='add'>
      <AddReedemPoint />
    </ProtectedRoute>
  }
/>

<Route
  path='/Point'
  element={
    <ProtectedRoute moduleName='point' requiredAction='view'>
      <Point />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddPoint'
  element={
    <ProtectedRoute moduleName='point' requiredAction='add'>
      <AddPoint />
    </ProtectedRoute>
  }
/>

<Route
  path='/Usersupplier'
  element={
    <ProtectedRoute moduleName='user_request' requiredAction='view'>
      <Usersupplier />
    </ProtectedRoute>
  }
/>

<Route
  path='/Wallet'
  element={
    <ProtectedRoute moduleName='wallet_request' requiredAction='view'>
      <Wallet />
    </ProtectedRoute>
  }
/>

<Route
  path='/AdminRoles'
  element={
    <ProtectedRoute moduleName='admin_role' requiredAction='view'>
      <AdminRoles />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddAdminRoles'
  element={
    <ProtectedRoute moduleName='admin_role' requiredAction='add'>
      <AddAdminRoles />
    </ProtectedRoute>
  }
/>

<Route
  path='/Admins'
  element={
    <ProtectedRoute moduleName='admin' requiredAction='view'>
      <Admins />
    </ProtectedRoute>
  }
/>

<Route
  path='/AddAdmins'
  element={
    <ProtectedRoute moduleName='admin' requiredAction='add'>
      <AddAdmins />
    </ProtectedRoute>
  }
/>

<Route
  path='/Financial/*'
  element={
    <ProtectedRoute moduleName='payment' requiredAction='view'>
      <Financial />
    </ProtectedRoute>
  }
/>
          <Route path='/Settings/*' element={<Settings />} /> *
          <Route path='/*' element={<ErrorPage />} />

{/* 
          <Route path='/Userbookingdetails' element={<Userbookingdetails />} />
          <Route path='/AddUser' element={<AddUser />} />
          <Route path='/UserDetails' element={<UserDetails />} />
          <Route path='/Buses/*' element={<Buses />} />
          <Route path='/Location/*' element={<Location />} />
          <Route path='/Booking/*' element={<Booking />} />
          <Route path='/Bookingdetailsmore' element={<Bookingdetailsmore />} />
          <Route path='/Trips' element={<Trips />} />
          <Route path='/AddTrips' element={<AddTrips />} />
          <Route path='/Operators' element={<Agents />} />
          <Route path='/AddOperators' element={<AddAgents />} />
          <Route path='/Complaints' element={<Complaints />} />
          <Route path='/AddComplaints' element={<AddComplaints />} />
          <Route path='/Car/*' element={<Car />} />
          <Route path='/Train/*' element={<Train />} />
          <Route path='/Minivan' element={<Hiace />} />
          <Route path='/MinivanAdd' element={<Addhiace/>} />
          <Route path='/Request' element={<Request/>} />
          <Route path='/Request' element={<Request/>} />
          <Route path='/ReedemPoint' element={<ReedemPoint/>} />
          <Route path='/AddReedemPoint' element={<AddReedemPoint/>} />
          <Route path='/Point' element={<Point/>} />
          <Route path='/AddPoint' element={<AddPoint/>} />
          <Route path='/Usersupplier' element={<Usersupplier/>} />
          <Route path='/Wallet' element={<Wallet/>} />
          <Route path='/PrivateRequest' element={<PrivateRequest />} />
          <Route path='/Commission' element={<CommissionSetup />} />
          <Route path='/AddCommission' element={<AddCommissionSetup />} />
          <Route path='/Currency' element={<Currency />} />
          <Route path='/AddCurrency' element={<AddCurrency />} />
          <Route path='/PayoutAccount' element={<Allpayot />} />
          <Route path='/HistoryPayout' element={<HistoryPayout />} />
          <Route path='/Cancelpayout' element={<Cancelpayout />} />
          <Route path='/AdminRoles' element={<AdminRoles />} />
          <Route path='/AddAdminRoles' element={<AddAdminRoles />} />
          <Route path='/Admins' element={<Admins />} />
          <Route path='/AddAdmins' element={<AddAdmins />} />
          <Route path='/Financial/*' element={<Financial />} />
          <Route path='/Settings/*' element={<Settings />} /> */}
          {/* <Route path='/Bookingdetails' element={<Bookingdetails />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Togo;
