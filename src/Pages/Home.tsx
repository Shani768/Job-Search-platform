import { useEffect, useState } from "react";
import JobCard from "../component/JobCard";
import axios from "axios";
import Pagination from "../component/Pagination";

interface Job_api {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  job_employment_type: string;
  job_posted_at: string;
  job_is_remote: boolean;
  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_apply_link: string;
}

export interface JobCardProps {
  job: Job_api;
}

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job_api[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // NEW


  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page: number) => {
    try {
      setLoading(true); // START LOADING
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: "developer jobs in chicago",
          num_pages: page,
          country: "us",
          date_posted: "all",
        },
        headers: {
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_JOB_SEARCH_API_KEY,
        },
      };

      const response = await axios.request<{ data: Job_api[] }>(options);
      const allJobs = response.data.data;
      const newJobs = allJobs.slice((page - 1) * 10, page * 10);

      setJobs(newJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mx-auto p-5">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
      Welcome to Your Job Search Platform
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
      Discover your next career opportunity with ease. Search, explore, and find jobs that match your skills and passions!
    </p>
  </div>

  {loading ? (
    <div className="text-center text-lg font-semibold py-10">
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    </div>
  ) : (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto">
        {jobs.map((job, index) => (
          <JobCard job={job} key={index} />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center mt-6">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  )}
</div>

  );
};

export default Home;
