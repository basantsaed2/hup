import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import NavPayoutAccount from './NavPayoutAccount.jsx'
import Swal from 'sweetalert2';

import ThreeThing from '../../component/ThreeThing.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';

const PayoutAccount = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/payoutRequest", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.payout);
      })
       .catch(() => {
               toast.error("Error fetching data")
             });
  }, [update])

  const handlecancel = (id) => {
    const token = localStorage.getItem('token');

    axios
      .put(`https://bcknd.ticket-hub.net/api/admin/payoutRequest/confirm/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('confirm  successfully');
        setUpdate(!update)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      });
  }

  const filteredData = data.filter((item) => {
    if (selectedFilter === "Filter") {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedFilter === '') {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

  const cheose = ["Filter", "amount", "date", "currency", "agent", "status"]
  const labelMap = {
    Filter: "Filter",
    amount: "amount",
    date: "date",
    agent: "agent",
    currency: "currency",
    status: "status"
  };

  const handelcancel = (id, one) => {
    const token = localStorage.getItem('token');
  
    Swal.fire({
      title: `Are you sure you want to cancel ${one}?`,
      input: 'textarea',
      inputLabel: 'Reason for cancellation',
      inputPlaceholder: 'Type your reason here...',
      inputAttributes: {
        'aria-label': 'Type your reason here'
      },
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it',
      cancelButtonText: 'No',
      icon: 'warning',
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage('You need to provide a reason for cancellation');
        }
        return reason;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const reason = result.value;
  
        axios.put(
          `https://bcknd.ticket-hub.net/api/admin/payoutRequest/cancel/${id}`,
          { rejected_reason: reason }, // هنا السبب بيتبعت في الـ body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then(() => {
            setUpdate(!update);
            Swal.fire('Canceled!', `Request has been canceled successfully.`, 'success');
          })
          .catch(() => {
            Swal.fire('Error!', `There was an error while cancelling the request.`, 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', `The request was not cancelled.`, 'info');
      }
    });
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
      <NavPayoutAccount />
        <ToastContainer />

      <div>
        <div className='flex justify-between items-center mt-10 px-5'>
          <div className='flex justify-center items-center gap-3 relative'>
            <input
              placeholder='Search'
              className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
          </div>
          <ThreeThing navGo='/AddCurrency' liked like
            labelMap={labelMap}
            cheose={cheose}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        <div className="mt-10 ml-5 hidden lg:block">
          <table className="w-full border-y border-x border-black ">
            <thead className="w-full">
              <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[10px] h-[56px] text-[16px] border-b text-left px-1">
                S/N
              </th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left pl-3"> Name</th>
                <th className="w-[158px] h-[56px]  text-[12px] border-b text-left pl-3"> Date</th>
                <th className="w-[158px] h-[56px]  text-[12px] border-b text-left"> Amount</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">Currency</th>
                {/* <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">agent</th> */}
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> Method</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">Status</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                   <td className="w-[10px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                  <td className="w-[143px] h-[56px]  text-[16px] px-1">{item?.agent?.name?? "N//A"}</td>
                  <td className="w-[143px] h-[56px]  text-[12px] px-2 ">{item?.date ?? "N//A"}</td>
                  <td className="w-[158px]   h-[56px]  text-[12px]  ">{item?.amount ?? "N//A"}</td>
                  <td className="w-[158px]  h-[56px]  text-[12px]  ">{item?.currency?.name ?? "N//A"}{item?.currency?.symbol ?? "N//A"}</td>
                  {/* <td className="w-[158px]   h-[56px]  text-[12px] ">{item?.agent ?? ''}</td> */}
                  <td className="w-[158px]   h-[56px]  text-[12px] ">{item?.payment_method?.name ??"N//A"}
                    <img src={item?.payment_method?.image_link ?? ''} className='w-5 h-5' /></td>
                  <td className=" w-[158px]    h-[56px]  text-[16px]  text-nine  font-normal  rounded-[8px]">{item?.status ??"N//A"}</td>
                  {item.status !== 'canceled' ? (
                    <td className="w-[158px]    flex gap-1 justify-center items-center h-12  ">
                      <button onClick={() => handlecancel(item.id, item.amount)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                        confirm
                      </button>
                      <button className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={() => handelcancel(item.id, item.amount)}>cancel</button>
                    </td>) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
                <div className="flex gap-4">
                <strong>S/N :</strong>
                <span> {(currentPage - 1) * rowsPerPage + index + 1} </span>
              </div>
              <div className="flex gap-4">
                <strong>date:</strong>
                <span>{item?.date ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>amount:</strong>
                <span>{item?.amount ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>currency:</strong>
                <span>{item?.currency?.name ?? "N//A"}{item?.currency?.symbol ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>agent:</strong>
                <span>{item?.agent?.name ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>Status:</strong>
                <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item?.status ?? "N//A"}</span>
              </div>
              <div className="flex gap-4">
                <strong>method:</strong>
                <img className="w-5 h-5" src={item?.payment_method?.image_link ?? "N//A"} />
                <span>{item?.payment_method?.name ?? "N//A"}</span>
              </div>
              <div className='flex'>
                {item.status !== 'canceled' ? (
                  <td className="w-[158px] flex gap-1 justify-center items-center h-12">
                    <button onClick={() => handlecancel(item.id, item.amount)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                      confirm
                    </button>
                    <button className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={() => handelcancel(item.id, item.amount)}>cancel</button>
                  </td>
                ) : (
                  <td></td>
                )}
              </div>
              <div className='w-full bg-white h-2'></div>
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
      <ToastContainer />
    </div>
  )
}

export default PayoutAccount;
