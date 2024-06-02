import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRestaurant = ({ onClose, handleRefreshSave }) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      name,
      address,
      telephone,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/restaurant/create",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message, {
        position: "top-right",
      });

      handleRefreshSave();
      clearData();
      //   console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    setName("");
    setAddress("");
    setTelephone("");
  };

  const handleConfirm = (e) => {
    if (!name || !address || !telephone) {
        return toast.error("All fields are required", {
            position: "top-right",
          });
    }

    if (telephone.length !== 10) {
        return toast.error("Telephone number should be only 10 digits", {
            position: "top-right",
          });
    }

    Swal.fire({
      title: "Are you sure want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave(e);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
        <div className="flex flex-col items-center gap-8 bg-white p-[20px] max-w-[500px] w-[80%] rounded">
          <h1 className="text-3xl font-mono font-bold underline">
            Add New Restaurant
          </h1>

          <div className="flex flex-col gap-3 w-[400px]">
            <label className="font-semibold">Name</label>
            <input
              className="border-2 rounded p-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="font-semibold">Address</label>
            <input
              className="border-2 rounded p-2"
              type="text"
              name="address"
              id="address"
              placeholder="Enter Restaurant Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="font-semibold">Telephone</label>
            <input
              className="border-2 rounded p-2"
              type="number"
              name="telephone"
              id="telephone"
              placeholder="Enter Restaurant Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>

          <div className="flex gap-8">
            <button
              className="bg-black text-white w-24 p-2 rounded font-semibold"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-950 text-white w-24 p-2 rounded font-semibold"
              onClick={(e) => handleConfirm(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRestaurant;
