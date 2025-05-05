import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

import delet from "../../assets/delete.svg";
import pin from "../../assets/pin.svg";
import ThreeThing from "../../component/ThreeThing";
const Complaints = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedFilter, setSelectedFilter] = useState(""); // Track selected filter option

  useEffect(() => {
    axios
      .get("https://bcknd.ticket-hub.net/api/admin/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.complaints);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
  }, [update]);
  const handleDelete = (index, subject_id) => {
    Swal.fire({
      title: `Are you sure you want to delete ${subject_id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://bcknd.ticket-hub.net/api/admin/complaint/delete/${index}`,
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
              `${subject_id} has been deleted successfully.`,
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              `There was an error while deleting ${subject_id}.`,
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", `${subject_id} was not deleted.`, "info");
      }
    });
  };
  // const handleEdit = (index) => {
  //   const sendData = data.find((item) => item.id === index);
  //   navigate('/AddComplaints', { state: { sendData } });
  // }
  const handreject = (id, message) => {
    axios
      .put(
        `https://bcknd.ticket-hub.net/api/admin/complaint/reject/${id}`,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("reject  successfully");
        setUpdate(!update);
      })
      .catch(() => {
        toast.error("Error  reject:");
      });
  };
  const handresolve = (id, message) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://bcknd.ticket-hub.net/api/admin/complaint/resolve/${id}`,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("resolve  successfully");
        setUpdate(!update);
      })
      .catch(() => {
        toast.error("Error  resolve:");
      });
  };
  const filteredData = data.filter((item) => {
    if (selectedFilter === "Filter") {
      return Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else if (selectedFilter === "") {
      return Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });
  const cheose = ["Filter", "message", "date", "status"];
  const labelMap = {
    Filter: "Filter",
    message: "message",
    date: "date",
    status: "status",
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-10 px-5">
        <div className="flex justify-center items-center gap-3 relative">
          <input
            placeholder="Search"
            className="w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <CiSearch className="w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6" />
        </div>
        <ThreeThing
          navGo="/AddComplaints"
          like
          labelMap={labelMap}
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>

      <div className="mt-10 ml-5 hidden lg:block">
        <table className="w-full border-y border-x border-black ">
          <thead className="w-full">
            <tr className="bg-four w-[1012px] h-[56px]">
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left pl-3">
                message
              </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                date
              </th>
          

              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                Status
              </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                reject&resolve
              </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="border-y hover:border-3 relative hover:bg-six"
              >
                <td className="w-[143px] h-[56px]  text-[16px] px-1  ">
                  {item?.message ?? "N//A"}
                </td>
                <td className="w-[143px] h-[56px]  text-[16px] ">
                  {item?.date ?? "N//A"}
                </td>
                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">

                <span
                  className={` bg-eight font-normal p-1 rounded-[8px]  ${
                    item.status === "pending"
                      ? "bg-orange-500 text-white"
                      : "bg-eight text-orange-500 "
                  }`}
                >
                  {item.status}
                </span>
                </td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">
                <select
                    className="text-white bg-orange-500 px-4 py-2 rounded-md text-[12px]"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "accept") {
                        handresolve(item.id);
                      } else if (value === "reject") {
                        handreject(item.id);
                      }
                    }}
                    defaultValue=""
                  >
                   <option value="" disabled>
                      Select
                    </option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                  </select>
                </td>
                

                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                  <img
                    className="w-[24px] h-[24px] ml-2 cursor-pointer"
                    src={delet}
                    onClick={() => handleDelete(item.id, item.message)}
                    alt="delete"
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      <div className="mt-10 ml-5 lg:hidden">
        <div className="w-[95%] bg-six">
          {filteredData.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 p-3">
              <div className="flex gap-4">
                <strong>message:</strong>
                <span>{item?.message ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>date:</strong>
                <span>{item?.date ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
              <select
                    className="text-white bg-orange-500 px-4 py-2 rounded-md text-[12px]"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "accept") {
                        handresolve(item.id);
                      } else if (value === "reject") {
                        handreject(item.id);
                      }
                    }}
                    defaultValue=""
                  >
                   <option value="" disabled>
                      Select
                    </option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                  </select>
              </div>
              <div className="flex gap-4">
                <strong>Status:</strong>
                <span
                  className={` bg-eight font-normal p-1 rounded-[8px]  ${
                    item.status === "pending"
                      ? "bg-orange-500 text-white"
                      : "bg-eight text-orange-500 "
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex">
                {/* <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} /> */}
                <img
                  className="w-[24px] h-[24px] ml-2 cursor-pointer"
                  src={delet}
                  onClick={() => handleDelete(item.id, item.name)}
                  alt="delete"
                />
              </div>

              <div className="w-full bg-white h-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
