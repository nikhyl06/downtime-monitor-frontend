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

const DowntimeDay = ({ dateLimits }) => {
  const axios = useAxiosPrivate();


  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [breakdownSums, setBreakdownSums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
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

  const monthCode = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const years = Array.from(
    { length: dateLimits.latestYear - dateLimits.oldestYear + 1 },
    (v, i) => i + dateLimits.oldestYear
  );

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth(""); // Reset month selection when year changes
  };

  const handleMonthChange = (e) => {
    if (selectedYear === "") {
      alert("Please select a year first.");
      return;
    }
    setSelectedMonth(e.target.value);
  };

  const getAvailableMonths = () => {
    if (selectedYear === dateLimits.oldestYear.toString()) {
      return months.slice(dateLimits.oldestMonth - 1);
    }
    if (selectedYear === dateLimits.latestYear.toString()) {
      return months.slice(0, dateLimits.latestMonth);
    }
    return months;
  };

  const availableMonths = getAvailableMonths();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedMonth) {
      alert("Please select both year and month.");
      return;
    }
    try {
      const response = await axios.get(
        `/breakdown/${selectedYear}/${selectedMonth}`
      );
      generateData(selectedYear, selectedMonth, response.data);
      setIsSubmitted(true);
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('Error: No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(`Error: ${error.message}`);
      }
      setIsSubmitted(false);
    }
  };


  function generateData(year, month, data) {
    const zeroIndexedMonth = month - 1; // Convert to zero-based index for the Date object
    const lastDayOfMonth = new Date(year, zeroIndexedMonth + 1, 0).getDate(); // Get last day of the month

    const days  = Array.from(
      { length: lastDayOfMonth },
      (_, index) => index + 1
    );
    const breakdowns = Array(lastDayOfMonth).fill(0);
    const breakdownCounts = Array(lastDayOfMonth).fill(0); // Reinitialize breakdownSums to match daysInMonth length

    data.forEach((entry) => {
      const date = Number(entry.date.slice(8, 10)); // Extract day from date string
      const breakdownTime = entry["breakdownTime"];
      breakdowns[date - 1] += breakdownTime;
      breakdownCounts[date - 1] += 1;
    });

    setDaysInMonth(days);
    setBreakdownSums(breakdowns);
  }

  const barChartData = {
    labels: daysInMonth,
    datasets: [
      {
        label: "BreakDown Time (in minutes)",
        data: breakdownSums,
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
          <select
            required
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mb-8 appearance-none w-64 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a month</option>
            {availableMonths.map((month, index) => (
              <option key={index} value={monthCode[month]}>
                {month}
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
      {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

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

export default DowntimeDay;
