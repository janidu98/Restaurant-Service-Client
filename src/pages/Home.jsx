import React, { useEffect, useState } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantDetail from "../components/RestaurantDetail";
import AddRestaurant from "../components/AddRestaurant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UpdateRestaurant from "../components/UpdateRestaurant";

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [restaurant, setRestaurant] = useState();
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [updateRestaurant, setUpdateRestaurant] = useState(false);
  const [updateId, setUpdateId] = useState();

  const [refreshAfterSave, setRefreshAfterSave] = useState(false);
  const [refreshAfterUpdate, setRefreshAfterUpdate] = useState(false);

  useEffect(() => {
    getRestaurants();
  }, [refreshAfterSave, refreshAfterUpdate]);

  //get all restaurant
  const getRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/restaurant/get");
      // console.log(res.data.data);
      setRestaurantList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete api
  const handleDelete = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/restaurant/delete/${id}`);
      console.log(res.data);
      getRestaurants();

      toast.success(res.data, {
        position: 'top-right',
      })

    } catch (error) {
      console.log(error);
    }
  }

  //open the RestaurantDetail component
  const handleShowDetails = (rest) => {
    setShowDetail(true);
    setRestaurant(rest);
  }
  //close the RestaurantDetail component
  const handleShowDetailClose = () => {
    setShowDetail(false);
  }

  //open the AddRestaurant component
  const handleAddRestaurant = () => {
    setAddRestaurant(true);
  }
  //close the AddRestaurant component
  const handleAddRestaurantClose = () => {
    setAddRestaurant(false);
  }

  //open the UpdateRestaurant component
  const handleUpdateRestaurant = (id) => {
    setUpdateRestaurant(true);
    setUpdateId(id);
  }
  //close the UpdateRestaurant component
  const handleUpdateRestaurantClose = () => {
    setUpdateRestaurant(false);
  }

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  //after saving, update the table
  const handleRefreshSave = () => {
    setRefreshAfterSave(!refreshAfterSave);
  }

  //after updating, update the table
  const handleRefreshUpdate = () => {
    setRefreshAfterUpdate(!refreshAfterUpdate);
  }

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col justify-center items-center mt-3 mb-3">
      <header className="w-2/3 text-center text-3xl p-5 border-gray-400 rounded-3xl border-4 font-bold">
        <h1>SRI LANKAN RESTAURANTS</h1>
      </header>

      <button className="text-xl bg-black text-white px-4 py-2 rounded-md mt-5 font-mono" onClick={handleAddRestaurant}>Add New</button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/5 mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Restaurant Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.length > 0 ? (
              restaurantList.map((rest, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {rest.name}
                  </th>
                  <td className="px-6 py-4 flex gap-4 items-center justify-center">
                    <VisibilityIcon className="cursor-pointer" onClick={() => handleShowDetails(rest)}/>
                    <EditIcon className="cursor-pointer" onClick={() => handleUpdateRestaurant(rest._id)}/>
                    <DeleteIcon className="cursor-pointer" onClick={() => handleConfirm(rest._id)}/>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                <td colSpan="6" className="px-6 py-4 text-center bg-black">
                  No Restaurants Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {addRestaurant && <AddRestaurant onClose={handleAddRestaurantClose} handleRefreshSave={handleRefreshSave}/>}
      {showDetail && <RestaurantDetail rest={restaurant} onClose={handleShowDetailClose}/>}
      {updateRestaurant && <UpdateRestaurant updateId={updateId} onClose={handleUpdateRestaurantClose} handleRefreshUpdate={handleRefreshUpdate}/>}
    </div>
    </>
  );
};

export default Home;
