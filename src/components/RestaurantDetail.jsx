import React from "react";

const RestaurantDetail = ({ rest, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center gap-8 bg-white p-[20px] max-w-[500px] w-[80%] rounded">
        <h1 className="text-3xl font-mono font-bold underline">Restaurant Details</h1>

        <div className="flex flex-col gap-3 px-5">
          <span className="text-xl">
            Name : <span className="font-sans font-medium">{rest.name}</span><hr className="mt-2"/>
          </span>
          <span className="text-xl">
            Address : <span className="font-sans font-medium">{rest.address}</span><hr className="mt-2"/>
          </span>
          <span className="text-xl">
            Telephone : <span className="font-sans font-medium">{rest.telephone}</span><hr className="mt-2"/>
          </span>
        </div>

        <button
          className="bg-black text-white w-24 p-2 rounded font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetail;
