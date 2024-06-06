import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Select from "react-select";

const initialFormData = {
  area: "",
  code: "",
  manufacturer: "",
  name: "",
};

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Machine ID is required"),
  area: Yup.string().required("Area is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  name: Yup.string().required("Machine Name is required"),
});

const DeleteMachine = () => {
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
  }, [isSubmitting]);

  const handleSelect = (selectedOption, setFieldValue) => {
    const code = selectedOption.value;
    const machine = machines.find((machine) => machine["code"] === code);
    setFieldValue("code", code);
    setFieldValue("name", machine["name"]);
    setFieldValue("manufacturer", machine["manufacturer"]);
    setFieldValue("area", machine["area"]);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setFeedbackMessage("");
    try {
      console.log(values.code);
      const response = await axios.delete(`machines/${values.code}`);
      console.log(response);  

      // Simulate a successful submission with a delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      setFeedbackMessage("Machine has been deleted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      resetForm();
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear the feedback message after 3 seconds
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-semibold mb-4">Add Machine</h1>
      <Formik
        initialValues={initialFormData}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col space-y-4 w-full">
            {!isSubmitting && <div className="flex flex-col">
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
            </div>}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Machine Name:</label>
              <Field
                readOnly
                autoComplete="off"
                type="text"
                name="name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold">Manufacturer:</label>
              <Field
                readOnly
                autoComplete="off"
                type="text"
                name="manufacturer"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <ErrorMessage
                name="manufacturer"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Area:</label>
              <Field
                readOnly
                autoComplete="off"
                type="text"
                name="area"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <ErrorMessage
                name="area"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className={`bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-600 ${
                isSubmitting && "cursor-not-allowed opacity-50"
              }`}
              disabled={isSubmitting}
            >
              Delete
            </button>
          </Form>
        )}
      </Formik>
      {feedbackMessage && (
        <div className="mt-4 p-2 text-red-600 bg-red-100 rounded-md">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default DeleteMachine;
