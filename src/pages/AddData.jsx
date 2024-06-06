import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import machines from "../data/unit-2-machines.json";

const AddData = () => {
  const axios = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // let i = 0;
    // const maxCount = 0;

    // const intervalId = setInterval(async () => {
      

    //   i++;
    //   if (i > maxCount) {
    //     clearInterval(intervalId); // Stop the interval when the max count is reached
    //   }
    // }, 100);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        add
      </button>
    </form>
  );
};

export default AddData;
