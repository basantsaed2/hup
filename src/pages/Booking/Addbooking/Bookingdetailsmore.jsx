import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDateRange, MdAirlineSeatReclineExtra } from 'react-icons/md';
import { TbPhoneCalling } from 'react-icons/tb';
import IconDash from '../../../ui/IconDash';

const Bookingdetailsmore = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { sendData } = location.state || {};
    if (sendData) {
      setUserData(sendData);
      console.log(sendData, 'userData in booking details more');
    }
  }, [location.state]);

  return (
    <div className='px-5 my-10'>
      {userData ? (
        <>
          {/* عنوان الرحلة */}
          <div className="bg-one w-full grid grid-cols-3 p-4 mb-4 rounded-lg shadow-lg text-white">
            <div className="flex flex-col justify-center">
              <span className="text-[16px] md:text-2xl font-bold">
                {userData.trip?.city?.name ?? "N/A"} to {userData.trip?.to_city?.name ?? "N/A"}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm md:text-lg font-semibold">Departure Time: {userData.trip?.deputre_time ?? "N/A"}</span>
              <span className="text-sm md:text-lg  font-semibold">Arrival Time: {userData.trip?.arrival_time ?? "N/A"}</span>
            </div>
          </div>

          {/* زر الرجوع */}
          <button className='transform rotate-180 w-full text-right' onClick={() => navigate(-1)}>
            <IconDash width="20" height={30} tone="#1E1E2F" icon="M14.369 15.9496L22.5296 7.88571..." />
          </button>

          {/* معلومات الأوبريتور */}
          <div className="bg-white w-full flex flex-col gap-3 p-4 mt-4">
            <span className="text-2xl font-bold flex gap-2 items-center">
              <TbPhoneCalling /> Operator Information
            </span>
            <div className="flex flex-col gap-2">
              <div><strong>Agent ID:</strong> {userData.agent?.id ?? 'No agent ID'}</div>
              <div><strong>Agent Name:</strong> {userData.agent?.name ?? 'No agent name'}</div>
              <div><strong>Agent Email:</strong> {userData.agent?.email ?? 'No agent email'}</div>
              <div><strong>Agent Phone:</strong> {userData.agent?.phone ?? 'No agent phone'}</div>
              <div><strong>Agent Code:</strong> {userData.agent?.code ?? 'No agent code'}</div>
            </div>
          </div>

          {/* معلومات الرحلة */}
          <div className="bg-yellow-200 w-full my-3 flex flex-col gap-3 p-4 rounded">
            <span className="text-2xl font-bold flex gap-2 items-center">
              <MdOutlineDateRange /> Departure Information
            </span>
            <div className="flex flex-col gap-2">
              <div><strong>Date:</strong> {userData.date ?? 'No date'}</div>
              <div>
                <strong>Departure Location:</strong>{" "}
                {userData.trip?.trip_name ?? ''}, {userData.trip?.city?.name ?? ''},{" "}
                {userData.destnation_from?.name ?? 'No departure station'},{" "}
                {userData.trip?.country?.name ?? 'No country'}
              </div>
              <div><strong>Departure Time:</strong> {userData.trip?.deputre_time ?? 'No departure time'}</div>
              <div>
  <strong>Arrival Location:</strong>{" "}
  {userData.trip?.to_city?.name ?? ''},{" "}
  {userData.destnation_to?.name ?? 'No arrival station'},{" "}
  {userData.trip?.to_country?.name ?? 'No country'}
</div>
              <div><strong>Arrival Time:</strong> {userData.trip?.arrival_time ?? 'No arrival time'}</div>
            </div>
          </div>

          {/* بيانات الركاب */}
          <div className="bg-white w-full flex flex-col gap-3 p-4">
            <span className="text-2xl font-bold flex gap-2 items-center">
              <MdAirlineSeatReclineExtra /> Passenger Details
            </span>
            {Array.isArray(userData.booking_users) && userData.booking_users.length > 0 ? (
  userData.booking_users.map((booking, index) => (
    <div key={index} className="flex flex-col gap-2 border-b pb-2 mb-2">
      <div><strong>Name:</strong> {booking.user?.name ?? 'No name'}</div>
      <div><strong>Kind:</strong> {booking.user?.gender ?? 'No kind'}</div>
      <div><strong>Email:</strong> {booking.user?.email ?? 'No email'}</div>
      <div><strong>Phone:</strong> {booking.user?.phone ?? 'No phone'}</div>
      <div><strong>Age:</strong> {booking.age ?? 'Unknown'}</div>
    </div>
  ))
) : (
  <div>No passengers information available.</div>
)}
          </div>
        </>
      ) : (
        <div className="bg-one w-full h-30 flex justify-center items-center text-center text-lg font-semibold text-gray-700">
          No bookings found for this user.
        </div>
      )}
    </div>
  );
};

export default Bookingdetailsmore;
