import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SparePartsMonths = ({ dateLimits }) => {
  const axios = useAxiosPrivate();

  const [selectedYear, setSelectedYear] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spareCount, setSpareCount] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: dateLimits.latestYear - dateLimits.oldestYear + 1 },
    (v, i) => i + dateLimits.oldestYear
  );

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear) {
      alert("Please select year.");
      return;
    }
    try {
      const response = await axios.get(
        `/breakdown/${selectedYear}`
      );
      generateData(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  function generateData(data) {
    const spareCount = Array(12).fill(0);

    data.forEach((breakdown) => {
      const month = breakdown["date"].slice(5, 7) - 1;
      breakdown["spares"].forEach((spare) => {
        spareCount[month] += spare["quantity"];
      })
      spareCount[month] += 1;
    });
    setSpareCount(spareCount);
  }

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: "Number of Spare used",
        data: spareCount,
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {};

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <select
            required
            value={selectedYear}
            onChange={handleYearChange}
            className="mb-8 mr-4 appearance-none w-64 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mb-8 ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center min-h-80 items-center w-2/3">
        {isSubmitted ? (
          <Bar data={barChartData} options={options} />
        ) : (
          <div>Please Select the Time Period</div>
        )}
      </div>
    </div>
  );
};

export default SparePartsMonths;
