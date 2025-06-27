import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBooking from "../NavBooking";
import ThreeThing from "../../../component/ThreeThing";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";

const CurrentBookings = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
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
      .filter((role) => role.module === "booking")
      .map((role) => role.action);
    setActions(paymentActions);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://bcknd.ticket-hub.net/api/admin/booking/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.bookingpending);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
  }, [update]);

  const handelconfirm = (id, one, two) => {
    const token = localStorage.getItem("token");
    console.log("tconfirm", token);
    Swal.fire({
      title: `Are you sure you want to confirm ${one} to ${two} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://bcknd.ticket-hub.net/api/admin/booking/confirm/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            setUpdate(!update);
            Swal.fire(
              "confirmed!",
              ` has been confirmed successfully.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting confirm:", error);
            Swal.fire("Error!", `There was an error while confirm.`, "error");
          });
      } else {
        Swal.fire("Cancelled", ` it was not Cancelled.`, "info");
      }
    });
  };
  const handelcancel = (id, one, two) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: `Are you sure you want to cancel ${one} to ${two}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://bcknd.ticket-hub.net/api/admin/booking/cancel/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            setUpdate(!update);
            Swal.fire(
              "canceled!",
              ` has been canceled successfully.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting cancel:", error);
            Swal.fire("Error!", `There was an error while cancel.`, "error");
          });
      } else {
        Swal.fire("cancel", ` it was not Cancelled.`, "info");
      }
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
  const cheose = [
    "Filter",
    "destenation_from",
    "destenation_to",
    "date",
    "seats_count",
    "status",
    "code",
  ];
  const labelMap = {
    Filter: "Filter",
    destenation_from: "destenation from",
    destenation_to: "destenation to",
    date: "date",
    seats_count: "seats_count",
    status: "status",
    code: "code",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  return (
    <div>
      <ToastContainer />

      <NavBooking />
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
          liked
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
              <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                S/N
              </th>

              <th className="w-[158px] h-[56px]  text-[14px] border-b text-left pl-3">
                Destenation_from{" "}
              </th>
              <th className="w-[158px] h-[56px]  text-[14px] border-b text-left">
                Destenation_to
              </th>
              <th className="w-[158px] h-[56px]  text-[14px]  border-b text-left">
                Date{" "}
              </th>
              <th className="w-[158px] h-[56px]  text-[14px]  border-b text-left">
                Seats_count
              </th>
              <th className="w-[158px] h-[56px]  text-[14px]  border-b text-left">
                Code
              </th>
              <th className="w-[158px] h-[56px]  text-[14px]  border-b text-left">
                Status
              </th>
              <th className="w-[158px] h-[56px]  text-[14px]  border-b text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-y hover:border-3 relative hover:bg-six"
              >
                <td className="w-[10px] h-[56px] lg:text-[14px]  px-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="w-[143px] h-[56px]  text-[12px] px-2 ">
                  {item?.destenation_from ?? "N//A"}
                </td>
                <td className="w-[143px] h-[56px]  text-[12px]  ">
                  {item?.destenation_to ?? "N//A"}
                </td>
                <td className="w-[143px] h-[56px]  text-[12px]  ">
                  {item?.date ?? "N//A"}
                </td>
                <td className="w-[143px] h-[56px]  text-[12px]  ">
                  {item?.seats_count ?? "N//A"}
                </td>
                <td className="w-[143px] h-[56px]  text-[12px]  ">
                  {item?.code ?? "N//A"}
                </td>
                <td className="w-[143px]  h-[56px]  text-[12px]  text-nine  ">
                  <span className="bg-eight font-normal p-2 rounded-[8px]">
                    {item.status}
                  </span>
                </td>

                {item.status !== "canceled" ? (
                  <td className="w-[143px]    flex gap-1 justify-center items-center h-12  ">
                    {actions.includes("status") && (
                      <button
                        className="bg-three py-1 px-2 rounded-[8px] text-white"
                        onClick={() =>
                          handelconfirm(
                            item.id,
                            item.destenation_from,
                            item.destenation_to
                          )
                        }
                      >
                        confirm
                      </button>
                    )}
                    {actions.includes("status") && (
                      <button
                        className="bg-three py-1 px-2 rounded-[8px] text-white"
                        onClick={() =>
                          handelcancel(
                            item.id,
                            item.destenation_from,
                            item.destenation_to
                          )
                        }
                      >
                        cancel
                      </button>
                    )}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
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
                <strong>Destenation_from:</strong>
                <span>{item.destenation_from}</span>
              </div>

              <div className="flex gap-4">
                <strong>Destenation_to:</strong>
                <span>{item.destenation_to}</span>
              </div>

              <div className="flex gap-4">
                <strong>Date:</strong>
                <span>{item.date}</span>
              </div>

              <div className="flex gap-4">
                <strong>Seats_count:</strong>
                <span>{item.seats_count}</span>
              </div>

              <div className="flex gap-4">
                <strong>Code:</strong>
                <span>{item.code}</span>
              </div>

              <div className="flex gap-4">
                <strong>Status:</strong>
                <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">
                  {item.status}
                </span>
              </div>

              {item.status !== "canceled" ? (
                <td className="w-[143px]    flex gap-1 justify-center items-center h-12  ">\
                                    {actions.includes("status") && (

                  <button
                    className="bg-three py-1 px-2 rounded-[8px] text-white"
                    onClick={() =>
                      handelconfirm(
                        item.id,
                        item.destenation_from,
                        item.destenation_to
                      )
                    }
                  >
                    confirm
                  </button> )}
                                      {actions.includes("status") && (

                  <button
                    className="bg-three py-1 px-2 rounded-[8px] text-white"
                    onClick={() =>
                      handelcancel(
                        item.id,
                        item.destenation_from,
                        item.destenation_to
                      )
                    }
                  >
                    cancel
                  </button>
                                      )}
                </td>
              ) : (
                <td></td>
              )}

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
      </>)}
    </div>
  );
};

export default CurrentBookings;
