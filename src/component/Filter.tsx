
type ModalProps = {
  selectedJobTypes: string[];
  setSelectedJobTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedExperiences: string[];
  setSelectedExperiences: React.Dispatch<React.SetStateAction<string[]>>;
  isRemote: boolean | null;
  setIsRemote: React.Dispatch<React.SetStateAction<boolean | null>>;
  datePosted: string;
  setDatePosted: React.Dispatch<React.SetStateAction<string>>;
};

const Filter: React.FC<ModalProps> = ({ 
  selectedJobTypes, 
  setSelectedJobTypes, 
  selectedExperiences, 
  setSelectedExperiences, 
  isRemote, 
  setIsRemote, 
  datePosted, 
  setDatePosted 
}) => {


  const jobTypes = ['FULLTIME', 'CONTRACTOR', 'PARTTIME', 'INTERN'];
  const experience = [
    "under_3_years_experience",
    "more_than_3_years_experience",
    "no_experience",
    "no_degree",
  ];
  const dateOptions: { [key: string]: string } = {
    All: "all",
    Today: "today",
    "3 Days": "3days",
    Week: "week",
    Month: "month",
  };

  const toggleFilter = (type: string, setFilter: (filter: (prev: string[]) => string[]) => void) => {
    setFilter((prev: string[]) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperiences([]);
    setIsRemote(null);
    setDatePosted("All");
  };

return (
    <>
      <div className="flex justify-between items-center mb-4">
  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Filter</h3>
  <button onClick={clearFilters} className="text-red-500 text-sm hover:underline">
    Clear all
  </button>
</div>

{/* Date Post Filter */}
<div className="mb-6">
  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 tracking-wide">
    📅 Date Posted
  </label>
  <select
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-gray-400"
    value={datePosted}
    onChange={(e) => setDatePosted(e.target.value)}
  >
    {Object.keys(dateOptions).map((option) => (
      <option key={option} value={option} className="text-sm">
        {option}
      </option>
    ))}
  </select>
</div>

{/* Job Type Filter */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Job Type
  </label>
  <div className="grid grid-cols-1 gap-2 mt-2">
    {jobTypes.map((type) => (
      <label key={type} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedJobTypes.includes(type)}
          onChange={() => toggleFilter(type, setSelectedJobTypes)}
          className="w-4 h-4 text-green-500 border-gray-300 dark:border-gray-600 rounded focus:ring focus:ring-green-300"
        />
        <span className="text-gray-700 dark:text-gray-300 text-sm">{type}</span>
      </label>
    ))}
  </div>
</div>

{/* Experience Filter */}
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Experience Type
  </label>
  <div className="grid grid-cols-1 gap-2 mt-2">
    {experience.map((type) => (
      <label key={type} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedExperiences.includes(type)}
          onChange={() => toggleFilter(type, setSelectedExperiences)}
          className="w-4 h-4 text-green-500 border-gray-300 dark:border-gray-600 rounded focus:ring focus:ring-green-300"
        />
        <span className="text-gray-700 dark:text-gray-300 text-sm">{type.replace(/_/g, " ")}</span>
      </label>
    ))}
  </div>
</div>

{/* Remote & Onsite */}
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 mt-2">
    Work Type
  </label>
  <div className="grid grid-cols-2 gap-2 mt-2">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isRemote === true}
        onChange={() => setIsRemote(true)}
        className="w-4 h-4 text-green-500 border-gray-300 dark:border-gray-600 rounded focus:ring focus:ring-green-300"
      />
      <span className="text-gray-700 dark:text-gray-300 text-sm">Remote</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isRemote === false}
        onChange={() => setIsRemote(false)}
        className="w-4 h-4 text-green-500 border-gray-300 dark:border-gray-600 rounded focus:ring focus:ring-green-300"
      />
      <span className="text-gray-700 dark:text-gray-300 text-sm">Onsite</span>
    </label>
  </div>
</div>

      </>
  );
};

export default Filter;
