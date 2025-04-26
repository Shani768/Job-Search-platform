
import Navbar from "./component/Navbar";
import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import SearchJobs from "./Pages/SearchJobs";
import JobDetailsPage from "./Pages/JobDetailPage";
import EstimatedSalaries from "./Pages/EstimatedSalary";


function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 h-full dark:text-gray-100 mx-auto">
  <Navbar />
  <div className="mt-5 m-5 flex justify-between">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-jobs" element={<SearchJobs />} />
      <Route path="/job/:jobId" element={<JobDetailsPage />} />
      <Route path="/Estimated-Salaries" element={<EstimatedSalaries />} />

    </Routes>
  </div>
</div>

  );
}

export default App
