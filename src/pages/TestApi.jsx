import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import data from "../data/breakdown2023.json";

const TestApi = () => {
  const axios = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Make request
      </button>
    </form>
  );
};

export default TestApi;
