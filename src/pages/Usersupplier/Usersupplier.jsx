import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreeThing from "../../component/ThreeThing";

import { CiSearch } from "react-icons/ci"; // Importing search icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";

const Usersupplier = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const token = localStorage.getItem("token");
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
      .filter((role) => role.module === "user_request")
      .map((role) => role.action);
    setActions(paymentActions);
   
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://bcknd.ticket-hub.net/api/admin/user_request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.user_request);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
  }, [update]);
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
  const cheose = ["Filter", "name", "phone", "email", "status"];
  const labelMap = {
    Filter: "Filter",
    name: " Name",
    phone: "Phone",
    email: "email",
    status: "status",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleStatusChange = (id, trag) => {
    if (trag === "Pending") return;
    axios
      .put(
        `https://bcknd.ticket-hub.net/api/admin/user_request/status/${id}`,
        {
          status: trag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Status updated successfully  ");

        setUpdate(!update);
      })
      .catch(() => {
        toast.error("error:");
      });
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  return (
    <div>
      <div className="flex justify-between items-center mt-10 px-5">
        <div className="flex justify-center items-center gap-3 relative">
          <input
            placeholder="Search"
            className="w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          />
          <CiSearch className="w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6" />
        </div>
        <ThreeThing
          like
          labelMap={labelMap}
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>

      <div className="mt-10 ml-5 hidden lg:block">
        <table className="w-full  border-y border-x border-black">
          <thead className="w-full">
            <tr className="bg-four w-[1012px] h-[56px]">
              <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                S/N
              </th>

              <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">
                Name{" "}
              </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                Phone{" "}
              </th>
              <th className="w-[158px] h-[56px] text-[14px] border-b text-left">
                Email{" "}
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
                  <td className="w-[143px] h-[56px] text-[16px] px-4">
                    {item?.phone ?? "N//A"}
                  </td>
                  <td className="w-[143px] h-[56px] text-[14px] ">
                    {item?.email ?? "N//A"}
                  </td>
                  <td className="w-[143px] h-[56px] text-[16px] text-nine">
                    <span className="bg-eight font-normal p-2 rounded-[8px]">
                      {item?.status ?? "N//A"}
                    </span>
                  </td>
                  <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                    {actions.includes("status") && (
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className="border p-1 rounded bg-three text-white text-[12px] md:text-[14px]"
                        style={{ minWidth: "100px" }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                      </select>
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
                    <strong>S/N :</strong>
                    <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
                  </div>
                  <div className="flex gap-4">
                    <strong>Name:</strong>
                    <span>{item?.name ?? "N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>Phone :</strong>
                    <span>{item?.phone ?? "N//A"}</span>
                  </div>

                  <div className="flex gap-4">
                    <strong>Email:</strong>
                    <span>{item?.email ?? "N//A"}</span>
                  </div>
                  <div className="flex gap-4">
                    <strong>Status :</strong>
                    <span className="text-nine">{item?.status ?? "N//A"}</span>
                  </div>
                  <div className="flex">
                                        {actions.includes("status") && (

                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className="border p-1 rounded bg-three text-white text-[12px] md:text-[14px]"
                      style={{ minWidth: "100px" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
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

      <ToastContainer />
    </div>
  );
};

export default Usersupplier;
