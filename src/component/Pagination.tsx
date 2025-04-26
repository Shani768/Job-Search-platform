import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
  <button
    className="px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    <FaChevronLeft size={18} />
  </button>

  <button className="px-3 py-1 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
    {currentPage}
  </button>

  <button
    className="px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    onClick={() => handlePageChange(currentPage + 1)}
  >
    <FaChevronRight size={18} />
  </button>
</div>

  );
};

export default Pagination;

