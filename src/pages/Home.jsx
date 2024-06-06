// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500">
        Downtime Monitoring
      </h1>
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          Go to Dashboard
        </button>
        <div className='mt-6'>This system is used to monitor downtimes of machines used in Panasonic premises.</div>

      </div>
    </div>
  );
}

export default Home;

