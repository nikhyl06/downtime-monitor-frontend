// src/components/LoginForm.js
import React, { useState } from "react";
import { replace, useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth.jsx";

const LoginForm = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          user: values.username,
          pwd: values.password,
        };
        const response = await axios.post("/auth", data);
        console.log(response.data);

        // Handle the response
        const user = response?.data?.user;
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({
          user,
          accessToken,
          roles,
        });
        navigate(from, { replace: true });
      } catch (error) {
        // Handle errors
        if (!error.response) {
          // Server not responding
          setErrorMessage("Server is not responding. Please try again later.");
        } else if (error.response.status === 400) {
          // User already exists
          setErrorMessage("username or password missing");
        } else if (error.response.status === 401) {
          // User already exists
          setErrorMessage("Wrong username or password");
        } else {
          setErrorMessage(error.response.data);
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
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
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
          <div className="mb-6">
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
              autoComplete="off"
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              New User?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Create account here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
