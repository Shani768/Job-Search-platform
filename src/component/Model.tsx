import React from 'react';
import { useModalStore } from '../../store/store';
import Filter from '../component/Filter'; // Assuming the Filter component is imported

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

const Modal: React.FC<ModalProps> = ({ 
  selectedJobTypes, 
  setSelectedJobTypes, 
  selectedExperiences, 
  setSelectedExperiences, 
  isRemote, 
  setIsRemote, 
  datePosted, 
  setDatePosted 
}) =>  {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        {/* Filter component inside the modal for small screens */}
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
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

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
