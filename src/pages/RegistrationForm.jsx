import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import * as Yup from "yup";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          user: values.username,
          pwd: values.password,
        };
        const response = await axios.post("/register", data);

        // Handle the response
        console.log(response.data); // Log the response data

        navigate("/registration-success");
      } catch (error) {
        // Handle errors
        if (!error.response) {
          // Server not responding
          setErrorMessage("Server is not responding. Please try again later.");
        } else if (error.response.status === 409) {
          // User already exists
          setErrorMessage("User already exists");
        } else {
          // Other server-side errors
          setErrorMessage("Error: " + error.response.data.message);
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg"
        >
          <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.username}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
