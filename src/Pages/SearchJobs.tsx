import { useState, useEffect, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "../component/SearchBar";
import axios from "axios";
import Filter from "../component/Filter";
import { FaFilter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useModalStore } from '../../store/store'
import Modal from "../component/Model";

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
  job_description: string;
  job_state: string;
  job_country: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_apply_link: string;
  job_longitude: number;
  job_latitude: number;
}

const SearchJobs = () => {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [datePosted, setDatePosted] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [country, setCountry] = useState<string>("")
  const [jobs, setJobs] = useState<Job_api[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Start from 1
  const [hasMore, setHasMore] = useState<boolean>(true); // Infinite scroll flag
  const fetchJobs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        query: searchQuery || "developer jobs in chicago",
        page: page,
        ...(country && { country }),
        ...(datePosted && { date_posted: datePosted }),
        ...(isRemote !== null && isRemote !== undefined && { work_from_home: String(isRemote) }),
        ...(selectedJobTypes.length > 0 && { employment_types: selectedJobTypes.join(",") }),
        ...(selectedExperiences.length > 0 && { job_requirements: selectedExperiences.join(",") }),
      };

      const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params,
        headers: {
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_JOB_SEARCH_API_KEY,
        },
      });

      const newJobs = response.data.data;

      setJobs(prev => [...prev, ...newJobs]);
      setCurrentPage(page);

      // If no new jobs returned, stop further fetch
      if (newJobs.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, datePosted, isRemote, selectedJobTypes, selectedExperiences, country]);


  useEffect(() => {
    
    setJobs([]);
    setHasMore(true); 
    setCurrentPage(1); 
    fetchJobs(1); 
  }, [searchQuery, country, datePosted, isRemote, selectedJobTypes, selectedExperiences, fetchJobs]); // Depend on filter and search query changes
  

  const loadMoreJobs = () => {
    fetchJobs(currentPage + 1);
  };
  const { openModal } = useModalStore();

  return (
    <div className="w-full p-6 flex flex-col md:flex-row gap-6 items-start justify-start">
  <div className="light:bg-white p-4 rounded-lg shadow-md w-72 border h-full border-gray-300 md:block hidden">
    <Filter
      selectedJobTypes={selectedJobTypes}
      setSelectedJobTypes={setSelectedJobTypes}
      selectedExperiences={selectedExperiences}
      setSelectedExperiences={setSelectedExperiences}
      isRemote={isRemote}
      setIsRemote={setIsRemote}
      datePosted={datePosted}
      setDatePosted={setDatePosted}
    />
  </div>
  <div className="w-full md:w-3/4">
    <SearchBar setSearchQuery={setSearchQuery} setCountry={setCountry} />

    <FaFilter
      onClick={openModal}
      className="block md:hidden cursor-pointer"
    />
    <Modal
      selectedJobTypes={selectedJobTypes}
      setSelectedJobTypes={setSelectedJobTypes}
      selectedExperiences={selectedExperiences}
      setSelectedExperiences={setSelectedExperiences}
      isRemote={isRemote}
      setIsRemote={setIsRemote}
      datePosted={datePosted}
      setDatePosted={setDatePosted}
    />
    <h2 className="text-xl font-semibold mt-4">Jobs results</h2>
    {loading ? (
      <div className="flex justify-center items-center mt-4">
        <div className="animate-spin h-10 w-10 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    ) : (
      <InfiniteScroll
        dataLength={jobs.length}
        next={loadMoreJobs}
        hasMore={hasMore}
        loader={
          <div className="text-center mt-4">
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          </div>
        }
        endMessage={
          <p className="text-center mt-4 text-gray-600">No more jobs to load.</p>
        }
      >
        <div className="mt-4 space-y-4 w-full max-w-6xl px-4">
          {jobs.map((job, index) => (
             <Link key={`${job.job_id}-${index}`} to={`/job/${job.job_id}`}>
              <div className="p-4 my-4 bg-white shadow-md rounded-2xl border w-full border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Left side */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                    <img
                      src={job.employer_logo}
                      alt=""
                      className="w-12 h-12 rounded-full object-contain"
                    />
                    <div className="flex flex-col gap-1 text-sm sm:text-base w-full">
                      <h3 className="text-base sm:text-lg font-bold">
                        {job.job_title.split(" ").slice(0, 3).join(" ") +
                          (job.job_title.split(" ").length > 3 ? "..." : "")}
                        <span
                          className={`ml-2 px-3 py-1 text-xs sm:text-sm font-medium rounded-lg ${job.job_is_remote
                            ? "bg-green-200 text-green-700"
                            : "bg-blue-200 text-blue-700"
                            }`}
                        >
                          {job.job_is_remote ? "Remote" : "On-site"}
                        </span>
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        {job.employer_name}
                        <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 rounded-lg dark:bg-yellow-200 font-medium">
                          {job.job_employment_type} • Urgently hiring
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-start sm:items-end gap-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 w-full md:w-auto">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(
                          `Latitude: ${job.job_latitude}, Longitude: ${job.job_longitude}`
                        );
                      }}
                    >
                      <FaMapMarkerAlt className="text-red-500" />
                      {job.job_location}, {job.job_country}
                    </span>
                    <span>
                      {new Date(job.job_posted_at_timestamp * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* For small screens (5 words) */}
                <p className="text-gray-500 dark:text-gray-300 text-sm sm:hidden mt-4 leading-relaxed">
                  {job.job_description.split(" ").slice(0, 5).join(" ") +
                    (job.job_description.split(" ").length > 5 ? "..." : "")}
                </p>

                {/* For medium and larger screens (70 words) */}
                <p className="text-gray-500 dark:text-gray-300 text-sm hidden sm:block mt-4 leading-relaxed">
                  {job.job_description.split(" ").slice(0, 70).join(" ") +
                    (job.job_description.split(" ").length > 70 ? "..." : "")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    )}
  </div>
</div>

  );
}
export default SearchJobs
