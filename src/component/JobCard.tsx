import React from "react";
import { JobCardProps } from "./Home";


import { useNavigate } from 'react-router-dom';

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job/${job.job_id}`);
  };

  return (
    <div
  className="p-5 border dark:border-gray-700 rounded-2xl shadow-md bg-white dark:bg-gray-800 cursor-pointer text-gray-900 dark:text-gray-100 transition-all duration-200 hover:shadow-lg"
  onClick={handleCardClick}
>
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <img
      src={job.employer_logo}
      alt={job.employer_name}
      className="w-12 h-12 rounded-full mx-auto sm:mx-0"
    />
    <div className="text-center sm:text-left w-full">
      <h2 className="text-base sm:text-lg font-semibold truncate w-full">
        {job.job_title.split(' ').slice(0, 3).join(' ') +
          (job.job_title.split(' ').length > 3 ? '...' : '')}
      </h2>
      <a
        href={job.employer_website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-600 dark:text-teal-400 text-sm sm:text-base"
      >
        {job.employer_name}
      </a>
    </div>
  </div>

  <div className="mt-3 space-y-1 text-sm sm:text-base">
    <p className="text-gray-600 dark:text-gray-300 font-medium">
      {job.job_employment_type} • {job.job_location}, {job.job_country}
    </p>
    <p className="text-gray-400 dark:text-gray-500">
      Posted on {job.job_posted_at}
    </p>
    <p className="text-gray-400 dark:text-gray-500">
      {new Date(job.job_posted_at_timestamp * 1000).toLocaleString()}
    </p>
  </div>

  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-lg ${
        job.job_is_remote
          ? 'bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-100'
          : 'bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-100'
      }`}
    >
      {job.job_is_remote ? 'Remote' : 'On-site'}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents navigate on click
        window.open(job.job_apply_link, '_blank');
      }}
      className="w-full sm:w-auto px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      Apply Now
    </button>
  </div>
</div>


  );
};

export default JobCard;
