import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThreeThing from "../../component/ThreeThing";
import Swal from "sweetalert2";
import NavLocation from "./NavLocation";
import delet from "../../assets/delete.svg";
import pin from "../../assets/pin.svg";
import Tiglebutton from "../../ui/Tiglebutton";
import { CiSearch } from "react-icons/ci"; // Import the search icon for the search field
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "@mui/material";

const Stations = () => {
  const [data, setData] = useState([]);
  const [datatwo, setDatatwo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [action, setAction] = useState(
    () => localStorage.getItem("action") || "on"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  useEffect(() => {
    const storedPosition = localStorage.getItem("role");
    let roles = [];
    if (storedPosition) {
      try {
        const position = JSON.parse(storedPosition);
        if (position && Array.isArray(position.roles)) {
          roles = position.roles;
        } else {
          console.warn("Position.roles is not an array or missing", position);
        }
      } catch (error) {
        console.error("Error parsing position from localStorage", error);
      }
    } else {
      console.warn("No position found in localStorage");
    }
    const paymentActions = roles
      .filter((role) => role.module === "stations")
      .map((role) => role.action);
    setActions(paymentActions);
   
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://bcknd.ticket-hub.net/api/admin/stations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data.pickup);
        setDatatwo(response.data.dropoff);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
  }, [update]);

  const handleDelete = (index, zoneName) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: `Are you sure you want to delete ${zoneName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://bcknd.ticket-hub.net/api/admin/station/delete/${index}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setUpdate(!update);
            Swal.fire(
              "Deleted!",
              `${zoneName} has been deleted successfully.`,
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              `There was an error while deleting ${zoneName}.`,
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", `${zoneName} was not deleted.`, "info");
      }
    });
  };

  const handleEdit = (index) => {
    if (action === "on") {
      const sendData = datatwo.find((item) => item.id === index);
      navigate("/Location/AddOffStation", { state: { sendData } });
    } else {
      const sendData = data.find((item) => item.id === index);
      navigate("/Location/AddOffStation", { state: { sendData } });
    }
  };

  const handleToggle = (newAction) => {
    setAction(newAction);
    localStorage.setItem("action", newAction);
  };

  const cheose = ["Filter", "name", "country_name", "city_name", "zone_name"];
  const labelMap = {
    Filter: "Filter",
    name: " name",
    country_name: "country",
    city_name: " city",
    zone_name: "zone",
  };

  const renderTable = (items) => {
    const filteredData = items.filter((item) => {
      const query = searchQuery.toLowerCase();

      if (selectedFilter === "Filter" || selectedFilter === "") {
        return Object.values(item).some(
          (value) => value && value.toString().toLowerCase().includes(query)
        );
      }

      if (item[selectedFilter]) {
        return item[selectedFilter].toString().toLowerCase().includes(query);
      }

      return false;
    });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const pageCount = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    return (
      <>
        <ToastContainer />

        <div className="mt-10 ml-5 hidden lg:block">
          <table className="w-full  border-y border-x border-black">
            <thead className="w-full">
              <tr className="bg-four w-[1012px] h-[56px]">
                <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                  S/N
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">
                  Name
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                  Country
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                  City
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                  Zone
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                  Status
                </th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                  Action
                </th>
              </tr>
            </thead>
            {actions.includes("view") && (
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-y hover:border-3 relative hover:bg-six"
                  >
                    <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] px-4">
                      {item?.name ?? "N//A"}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] ">
                      {item?.country_name ?? "N//A"}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] ">
                      {item?.city_name ?? "N//A"}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] ">
                      {item?.zone_name ?? "N//A"}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] ">
                      {item?.status ?? "N//A"}
                    </td>
                    <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-5 items-center">
                      {actions.includes("edit") && (
                        <img
                          className="w-[24px] h-[24px]"
                          src={pin}
                          onClick={() => handleEdit(item.id)}
                          alt="edit"
                        />
                      )}

                      {actions.includes("delete") && (
                        <img
                          className="w-[24px] h-[24px] ml-2 cursor-pointer"
                          src={delet}
                          onClick={() => handleDelete(item.id, item.name)}
                          alt="delete"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {actions.includes("view") && (
          <>
            <div className="mt-10 ml-5 lg:hidden">
              <div className="w-[95%] bg-six">
                {paginatedData.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4 p-3">
                    <div className="flex gap-4">
                      <strong>S/N:</strong>
                      <span>
                        {" "}
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <strong>name:</strong>
                      <span>{item?.name ?? "N//A"}</span>
                    </div>
                    <div className="flex gap-4">
                      <strong>Country:</strong>
                      <span>{item?.country_name ?? "N//A"}</span>
                    </div>
                    <div className="flex gap-4">
                      <strong>city:</strong>
                      <span>{item?.city_name ?? "N//A"}</span>
                    </div>
                    <div className="flex gap-4">
                      <strong>Zone:</strong>
                      <span>{item?.zone_name ?? "N//A"}</span>
                    </div>
                    <div className="flex gap-4">
                      <strong>Status:</strong>
                      <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">
                        {item?.status ?? "N//A"}
                      </span>
                    </div>
                    <div className="flex">
                      {actions.includes("edit") && (
                        <img
                          className="w-[24px] h-[24px]"
                          src={pin}
                          onClick={() => handleEdit(item.id)}
                          alt="edit"
                        />
                      )}
                      {actions.includes("delete") && (
                        <img
                          className="w-[24px] h-[24px] ml-2 cursor-pointer"
                          src={delet}
                          onClick={() => handleDelete(item.id, item.name)}
                          alt="delete"
                        />
                      )}
                    </div>
                    <div className="w-full bg-white h-2"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#F58220",
                    "&.Mui-selected": {
                      backgroundColor: "#F58220",
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#f5923a", // درجة أفتح عند الـhover (اختياري)
                    },
                  },
                }}
                shape="rounded"
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <NavLocation />
      <div className="flex mx-2 mt-6 gap-3">
        <Tiglebutton
          action={action === "on" ? "off" : "on"}
          onClick={() => handleToggle("off")}
          title="Pick-up"
        />
        <Tiglebutton
          action={action === "on" ? "on" : "off"}
          onClick={() => handleToggle("on")}
          title="Drop-off"
        />
      </div>
      {/* Search Bar */}
      <div className="flex justify-between items-center gap-3 relative mt-6 px-5">
        <input
          placeholder="Search"
          className=" h-10 lg:h-[48px] w-15 lg:w-25 border-2 border-two rounded-[8px] pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <CiSearch className="w-4 h-4 md:w-6 text-black font-medium absolute left-6 md:h-6" />
        {actions.includes("add") ? (
          <ThreeThing
            navGo="/Location/AddOffStation"
            liked
            labelMap={labelMap}
            cheose={cheose} // Pass the cheose array to ThreeThing component
            selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
            setSelectedFilter={setSelectedFilter}
          />
        ) : (
          <ThreeThing
            navGo="/Location/AddOffStation"
            liked
            like
            labelMap={labelMap}
            cheose={cheose} // Pass the cheose array to ThreeThing component
            selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      {action === "on" ? renderTable(datatwo) : renderTable(data)}
    </div>
  );
};

export default Stations;
