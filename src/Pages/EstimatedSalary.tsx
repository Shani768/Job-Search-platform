import { useState } from "react";
import { SalaryChart } from "../component/SalaryChart";
import axios from "axios";

function EstimatedSalaries() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(30);

  interface SalaryData {
    name: string;
    "Minimum Salary": number;
    "Median Salary": number;
    "Maximum Salary": number;
  }

  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const fetchSalaryData = async () => {
    if (!jobTitle || !location) return alert("Please enter job title and location.");

    setLoading(true);
    try {
      const response = await axios.get(`https://jsearch.p.rapidapi.com/estimated-salary`, {
        params: {
          job_title: jobTitle,
          location: location,
          location_type: "ANY",
          years_of_experience: "ALL",
        },
        headers: {
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_JOB_SEARCH_API_KEY,
        },
      });

      const salary = response?.data?.data[0];
      if (salary) {
        setSalaryData({
          name: salary.publisher_name,
          "Minimum Salary": salary.min_salary,
          "Median Salary": salary.median_salary,
          "Maximum Salary": salary.max_salary,
        });
      } else {
        setSalaryData(null);
        alert("No data found for this job and location.");
      }
    } catch (error) {
      console.error("Error fetching salary data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 m-auto">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
        Estimated Salaries
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">{today}</p>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Data Analyst"
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, NY"
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Radius
              </label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2"
              />
            </div>
          </div>

          <button
            onClick={fetchSalaryData}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
          >
            Search
          </button>
        </div>

        <div className="flex items-center justify-center">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : salaryData ? (
            <SalaryChart salaryData={salaryData} />
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-sm">No salary data</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EstimatedSalaries;
