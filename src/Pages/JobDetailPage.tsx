// JobDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


// types.ts
export interface JobDetail {
    job_id: string;
    job_title: string;
    employer_logo: string;
    employer_name: string;
    job_location: string;
    job_employment_type: string;
    job_description: string;
    job_highlights: {
        Qualifications: string[];
        Responsibilities: string[];
    };
    job_apply_link: string;
}



const JobDetailsPage = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const [jobDetail1, setJobDetail1] = useState<JobDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await axios.get(
                    `https://jsearch.p.rapidapi.com/job-details`,
                    {
                        params: {
                            job_id: jobId,
                            country: 'us',
                        },
                        headers: {
                            'x-rapidapi-host': 'jsearch.p.rapidapi.com',
                            'x-rapidapi-key': import.meta.env.VITE_JOB_SEARCH_API_KEY,
                        },
                    }
                );

                const jobData = response.data.data?.[0]; // The job detail
                setJobDetail1(jobData);
            } catch (err) {
                setError((err instanceof Error ? err.message : 'Something went wrong!'));
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetail();
    }, [jobId]);

    if (loading) return <div className="m-auto">
        <div className="flex justify-center items-center  py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
    </div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!jobDetail1) return <div className="text-center">No job detail found.</div>;


    const fallbackPic = '/logo.jpg';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
  {/* Header */}
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">{jobDetail1.job_title}</h2>
    <a
      href={jobDetail1.job_apply_link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-5 rounded-lg shadow"
    >
      Apply Now
    </a>
  </div>

  {/* Company Info */}
  <div className="flex items-center space-x-4">
    <img
      src={jobDetail1?.employer_logo || fallbackPic}
      alt="Company Logo"
      className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
    />
    <div>
      <div className="text-base font-medium">{jobDetail1.employer_name}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{jobDetail1.job_location}</div>
    </div>
  </div>

  {/* Job Meta */}
  <div className="flex flex-wrap text-sm gap-4">
    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
      {jobDetail1?.job_employment_type}
    </span>
    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2–4 Years</span>
  </div>

  {/* About this role */}
  <div>
    <h3 className="text-lg font-semibold mb-2">About this Role</h3>
    <p className="leading-relaxed">{jobDetail1.job_description}</p>
  </div>

  {/* Qualifications */}
  {jobDetail1.job_highlights?.Qualifications?.length > 0 && (
    <div>
      <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
      <ul className="list-disc list-inside space-y-1">
        {jobDetail1.job_highlights.Qualifications.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Responsibilities */}
  {jobDetail1.job_highlights?.Responsibilities?.length > 0 && (
    <div>
      <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
      <ul className="list-disc list-inside space-y-1">
        {jobDetail1.job_highlights.Responsibilities.map((r, index) => (
          <li key={index}>{r}</li>
        ))}
      </ul>
    </div>
  )}
</div>

    );
};

export default JobDetailsPage;
