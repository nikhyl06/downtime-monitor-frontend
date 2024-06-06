import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 animate-bounce">401</h1>
        <p className="mt-4 text-3xl text-gray-600">Unauthorized</p>
        <p className="mt-4 text-lg text-gray-600">Contact admin for access</p>

        <Link onClick={handleGoBack} className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
