import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

const AddMachine = () => {
  const axios = useAxiosPrivate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
  setFeedbackMessage("");
    try {
      const response = await axios.post("machines", {
        ...values,
        unitName: values.unitName,
      });
      console.log(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFeedbackMessage("Machine has been Added successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      resetForm();
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear the feedback message after 3 seconds
    }

    resetForm();
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
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Machine ID:</label>
              <Field
                autoComplete="off"
                type="text"
                name="code"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Machine Name:</label>
              <Field
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
              className={`bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 ${
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
  );
};

export default AddMachine;
