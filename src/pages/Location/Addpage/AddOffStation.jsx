import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AddAll from "../../../ui/AddAll";
import picdone from "../../../assets/picdone.svg";
import InputArrow from "../../../ui/InputArrow";
import SwitchButton from "../../../ui/SwitchButton";
import InputField from "../../../ui/InputField";
import Inputfiltter from "../../../ui/Inputfiltter";
// import GetLocationLink from '../../../ui/GetLocationLink';
import MapPicker from "../../../ui/MapPicker";

const AddOffStation = () => {
  const [locat, setLocation] = useState({
    lat: 30.033333, // القاهرة
    lng: 31.233334,
  });
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };
  //     const [namegoogle, setnamegoogle] = useState('');
  //     const [tourPickUp, setTourPickUp] = useState({
  //       pick_up_country: '',
  //       pick_up_city: '',
  //       pick_up_map: '',
  //       lat: 31.2001, // Default latitude (Alexandria)
  //       lng: 29.9187, // Default longitude
  // });
  //   const [google, setgoogle] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [valuee, setValue] = useState("inactive");
  const [pickup, setpickup] = useState("0");
  const [dropoff, setdropoff] = useState("0");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const extractLatLng = (url) => {
    // استخراج الإحداثيات من الرابط باستخدام تعبير منتظم
    const regex = /q=([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+)/;
    const matches = url.match(regex);

    if (matches) {
      const lat = parseFloat(matches[1]);
      const lng = parseFloat(matches[2]);
      return { lat, lng };
    } else {
      return null; // في حالة عدم وجود الإحداثيات في الرابط
    }
  };
  const [errors, setErrors] = useState({
    country: "",
    city: "",
    name: "",
    zone: "",
    google: "",
  });
  useEffect(() => {
    const { sendData } = location.state || {};
    console.log(sendData);
    if (sendData) {
      setCountry(sendData.country_id);
      setCity(sendData.city_id);
      setZone(sendData.zone_id);
      setName(sendData.name);
      setValue(sendData.status);
      setpickup(sendData.pickup);
      setdropoff(sendData.dropoff);

      //
      const url = sendData.location;
      const locatio = extractLatLng(url);

      if (locatio) {
        console.log(`Latitude: ${locatio.lat}, Longitude: ${locatio.lng}`);
      } else {
        console.log("لم يتم العثور على الإحداثيات في الرابط.");
      }
      setLocation({
        lat: locatio.lat,
        lng: locatio.lng,
      });
      setEdit(true);
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "countries") setCountry(value);
    if (name === "name") setName(value);
    if (name === "zones") setZone(value);
    if (name === "cities") setCity(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!country) formErrors.country = "Country is required";
    if (!name) formErrors.name = "name is required";
    if (!city) formErrors.city = "city is required";
    if (!zone) formErrors.zone = "zone is required";
    if (!locat.lat) formErrors.zone = "location is required";
    // if (!google) formErrors.google = 'google-map is required';
    if (pickup === "0" && dropoff === "0")
      formErrors.check = "At least choose one";
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const token = localStorage.getItem("token");

    const newUser = {
      name: name,
      country_id: country,
      city_id: city,
      status: valuee,
      pickup: pickup,
      dropoff: dropoff,
      zone_id: zone,
      location: `https://maps.google.com/?q=${locat.lat},${locat.lng}`,

      basic_station: "0",
    };

    if (edit) {
      const { sendData } = location.state || {};
      axios
        .put(
          `https://bcknd.ticket-hub.net/api/admin/station/update/${sendData.id}`,
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Stations updated successfully");

          setTimeout(() => {
            navigate("/Location/Stations");
          }, 2000);
        })
        .catch(() => {
          toast.error("failed");
        });
      return;
    }

    axios
      .post("https://bcknd.ticket-hub.net/api/admin/station/add", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Stations added successfully");

        setTimeout(() => {
          navigate("/Location/Stations");
        }, 2000);
      })
      .catch(() => {
        toast.error("failed");
      });

    setpickup("0");
    setdropoff("0");
    setValue("inactive");
    // setgoogle('');

    setCountry("");
    setName("");
    setCity("");
    setZone("");
    setEdit(false);
  };
  //    const handleChangeTourPickUp = (e) => {
  //     const { name, value } = e.target;

  //     // If user enters a Google Maps link, extract lat/lng and update state
  //     if (name === "pick_up_map") {
  //       const googleCoords = extractLatLngFromGoogleLink(value);
  //       if (googleCoords) {
  //         setTourPickUp((prev) => ({
  //           ...prev,
  //           pick_up_map: value, // Store full URL
  //           lat: googleCoords.lat,
  //           lng: googleCoords.lng,
  //         }));
  //       } else {
  //         setTourPickUp((prev) => ({ ...prev, [name]: value }));
  //       }
  //     } else {
  //       setTourPickUp((prev) => ({ ...prev, [name]: value }));
  // }
  // };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }
  return (
    <div className="ml-6 flex flex-col  mt-6 gap-6">
      <AddAll
        navGo="/Location/Stations"
        name={edit ? "Edit Stations" : "Add Stations"}
      />
      <div className="flex flex-wrap gap-6  mt-6">
        <InputField
          placeholder="Stations"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <InputArrow
          like
          placeholder="Country"
          name="countries"
          value={country}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          like
          placeholder="city"
          name="cities"
          value={city}
          onChange={handleChange}
          shara={country}
          required
        />
        <Inputfiltter
          like
          placeholder="zone"
          name="zones"
          value={zone}
          onChange={handleChange}
          shara={city}
          required
        />{" "}
      </div>

      <SwitchButton value={valuee} setValue={setValue} />
      <SwitchButton value={pickup} num title="pickup" setValue={setpickup} />
      <SwitchButton value={dropoff} num title="dropoff" setValue={setdropoff} />
      <div className=" flex flex-col my-3 ">
        <span className="text-2xl  text-black ">Place</span>
        <div className="flex flex-wrap gap-6 mt-6 bg-eight p-5">
          {/* <input type="hidden" name="lat" value={tourPickUp.lat} />
        <input type="hidden" name="lng" value={tourPickUp.lng} />

        <div className="border rounded-xl overflow-hidden shadow-md">
        <GetLocationLink tourPickUp={tourPickUp} setTourPickUp={setTourPickUp} />
</div>  */}

          {/* <GetLocationLink
            google={google} // تمرير الإحداثيات هنا
            setnamegoogle={setnamegoogle}
            onLocationChange={(location) => setgoogle(location)}
          /> */}

          <div className=" mx-auto p-6">
            <MapPicker location={locat} onLocationChange={updateLocation} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className=" bg-one mt-5 w-[200px] lg:w-[300px] h-[72px] border border-one rounded-[8px] relative overflow-hidden "
          onClick={handleSave}
        >
          <span className=" h-[56px] mx-auto lg:h-[72px] w-[400px]   text-white text-2xl rounded-[8px] mt-2 lg:mt-5  transform transition hover:scale-95">
            {" "}
            {edit ? "Edit" : "Add"}
          </span>
          <span className="absolute w-20 h-20 right-45 lg:right-60 z-2 bg-three top-0 transform transition rotate-45"></span>
          <span className="absolute w-25 h-25 right-40 lg:right-55 bg-white top-0 transform transition rotate-30"></span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddOffStation;
