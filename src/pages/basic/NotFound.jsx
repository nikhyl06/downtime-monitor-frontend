import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 animate-bounce">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
