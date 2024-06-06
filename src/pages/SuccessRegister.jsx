// src/components/RegistrationForm.js
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SuccessRegister = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for registering with us. You can now log in to your
            account.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessRegister;
