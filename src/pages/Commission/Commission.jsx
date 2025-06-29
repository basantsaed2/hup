import React, { useEffect, useState } from "react";
import pin from "../../assets/pin.svg";
import ThreeThing from "../../component/ThreeThing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";

const Commission = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
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
      .filter((role) => role.module === "Commission")
      .map((role) => role.action);
    setActions(paymentActions);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://bcknd.ticket-hub.net/api/admin/defaultCommission", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.default_commission);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
  }, [update]);
  const handleEdit = () => {
    navigate("/AddCommission");
  };
  const cheose = [];

  return (
    <div>
      {data.length === 0 && actions.includes("add") ? (
        <div className="flex justify-end w-full  mt-10 px-5">
          <ThreeThing
            navGo="/AddCommission"
            cheose={cheose} // Pass the cheose array to ThreeThing component
          />
        </div>
      ) : (
        <div className="flex justify-between items-center mt-10 px-5">
          <ThreeThing
            like
            cheose={cheose} // Pass the cheose array to ThreeThing component
          />
        </div>
      )}
      <ToastContainer />

      <div className="mt-10 ml-5 hidden lg:block">
        <table className="w-full border-y border-x border-black ">
          <thead className="w-full">
            <tr className="bg-four w-[1012px] h-[56px]">
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3">
                Train{" "}
              </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                Bus{" "}
              </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">
                Hiace
              </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">
                Action
              </th>
            </tr>
          </thead>
          {actions.includes("view") && (
            <tbody>
              <tr className="border-y hover:border-3 relative hover:bg-six">
                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">
                  {data.train}%
                </td>
                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">
                  {data.bus}%
                </td>
                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">
                  {data.hiace}%
                </td>
                <td className="w-[143px] h-[56px]  lg:text-[12px] xl:text-[16px] flex justify-start items-center">
                  {actions.includes("edit") && (
                    <img
                      className="w-[24px] h-[24px]"
                      src={pin}
                      onClick={() => handleEdit()}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
     {actions.includes("view") && (
        <>
      <div className="mt-10 ml-5 lg:hidden">
        <div className="w-[95%] bg-six">
          <div className="flex flex-col gap-4 p-3">
            <div className="flex gap-4">
              <strong>Train:</strong>
              <span>{data.train}%</span>
            </div>
            <div className="flex gap-4">
              <strong>Bus:</strong>
              <span>{data.bus}%</span>
            </div>
            <div className="flex gap-4">
              <strong>Train:</strong>
              <span>{data.hiace}%</span>
            </div>
            <div className="flex gap-4">
              <strong>Hiace:</strong>
              <span>{data.train}%</span>
            </div>

            <div className="flex">
                                  {actions.includes("edit") && (

              <img
                className="w-[24px] h-[24px]"
                src={pin}
                onClick={() => handleEdit()}
              />                    )}

            </div>
            <div className="w-full bg-white h-2"></div>
          </div>
        </div>
      </div>
           </>
      )}
    </div>
  );
};

export default Commission;
