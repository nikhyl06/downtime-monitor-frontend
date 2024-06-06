import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import * as Yup from "yup";
import Select from "react-select";

const initialFormData = {
  date: "",
  area: "",
  code: "",
  manufacturer: "",
  name: "",
  breakdownCause: "",
  rootCause: "",
  actionTaken: "",
  attendedBy: "",
  spares: [],
  breakdownTime: "",
};

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  code: Yup.string().required("Machine ID is required"),
  area: Yup.string().required("Area is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  name: Yup.string().required("Machine Name is required"),
  breakdownCause: Yup.string().required("Breakdown Cause is required"),
  rootCause: Yup.string().required("Root Cause is required"),
  actionTaken: Yup.string().required("Action Taken is required"),
  attendedBy: Yup.string().required("Attended By is required"),
  spares: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Spare name is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .positive()
        .integer(),
    })
  ),
  breakdownTime: Yup.number()
    .required("Breakdown Time is required")
    .positive()
    .integer(),
});

const Input = () => {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const [machines, setMachines] = useState([]);
  const [options, setOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    axios
      .get("machines")
      .then((response) => {
        const loadedMachines = response.data;
        setMachines(loadedMachines);
        const options = loadedMachines
          .filter(
            (machine) =>
              machine["code"] !== null &&
              machine["code"] !== "1" &&
              machine["code"] !== "na"
          )
          .map((machine) => ({
            value: machine["code"],
            label: machine["code"],
          }));
        setOptions(options);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleSelect = (selectedOption, setFieldValue) => {
    const code = selectedOption.value;
    const machine = machines.find((machine) => machine["code"] === code);
    setFieldValue("code", code);
    setFieldValue("name", machine["name"]);
    setFieldValue("manufacturer", machine["manufacturer"]);
    setFieldValue("area", machine["area"]);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post("/breakdown", values);
      console.log("Success:", response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFeedbackMessage("Breakdown has been Added successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      resetForm();
      setTimeout(() => setFeedbackMessage(""), 2000); // Clear the feedback message after 3 seconds
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Machine Maintenance Work Order
        </h1>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold" htmlFor="date">
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Machine ID:</label>
                <Select
                  options={options}
                  onChange={(option) => handleSelect(option, setFieldValue)}
                  placeholder="Select Machine ID"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Area:</label>
                <Field
                  readOnly
                  type="text"
                  name="area"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="area"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Manufacturer:</label>
                <Field
                  readOnly
                  type="text"
                  name="manufacturer"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="manufacturer"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Machine Name:</label>
                <Field
                  readOnly
                  type="text"
                  name="name"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Breakdown Cause:
                </label>
                <Field
                  autoComplete="off"
                  type="text"
                  name="breakdownCause"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="breakdownCause"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Root Cause:</label>
                <Field
                  autoComplete="off"
                  type="text"
                  name="rootCause"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="rootCause"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Action Taken:</label>
                <Field
                  autoComplete="off"
                  type="text"
                  name="actionTaken"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="actionTaken"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Breakdown Attended By:
                </label>
                <Field
                  autoComplete="off"
                  type="text"
                  name="attendedBy"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="attendedBy"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <FieldArray
                name="spares"
                render={(arrayHelpers) => (
                  <div>
                    <label className="text-sm font-semibold">
                      Spares Used:
                    </label>
                    {values.spares.map((spare, index) => (
                      <div
                        key={index}
                        className="flex space-x-2 items-center mb-2"
                      >
                        <Field
                          name={`spares[${index}].name`}
                          placeholder="Spare Name"
                          className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <Field
                          name={`spares[${index}].quantity`}
                          placeholder="Quantity"
                          type="number"
                          className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                        >
                          -
                        </button>
                        <ErrorMessage
                          name={`spares[${index}].name`}
                          component="div"
                          className="text-red-500"
                        />
                        <ErrorMessage
                          name={`spares[${index}].quantity`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", quantity: "" })
                      }
                      className="bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                )}
              />

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Breakdown Time In Minutes:
                </label>
                <Field
                  type="number"
                  name="breakdownTime"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="breakdownTime"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${
                  isSubmitting && "cursor-not-allowed opacity-50"
                }`}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {feedbackMessage && (
          <div className="mt-4 p-2 text-green-600 bg-green-100 rounded-md">
            {feedbackMessage}
          </div>
        )}
      </div>
      <div className="border-dashed rounded-lg border-2 border-rose-700 my-16 py-4 px-8">
        <div className="text-xl mb-4">Modify Machines if Required</div>
        <button
          onClick={() => navigate("/addMachine")}
          className="px-4 py-2 mr-6 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm hover:bg-green-700"
        >
          Add Machine
        </button>
        <button
          onClick={() => navigate("/updateMachine")}
          className="px-4 py-2 mr-6 bg-blue-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:bg-blue-700"
        >
          Update Machine
        </button>
        <button
          onClick={() => navigate("/deleteMachine")}
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm hover:bg-red-700"
        >
          Delete Machine
        </button>
      </div>
    </>
  );
};

export default Input;
