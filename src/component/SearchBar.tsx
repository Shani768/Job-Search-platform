import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { getNames, getCode } from "country-list";
import Select from "react-select";

const countryOptions = getNames()
  .map((name) => {
    const countryCode = getCode(name); // Get country code (e.g., "US", "DE")
    return countryCode
      ? {
        label: name,
        value: countryCode.toLowerCase(), // Convert to lowercase (e.g., "us", "de")
        flag: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`, // Flag image URL
      }
      : null;
  })
  .filter((option): option is { label: string; value: string; flag: string } => option !== null);


  type SearchBarProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
  };


  const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, setCountry }) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<{ label: string; value: string; flag: string } | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleClick= () =>{
    setSearchQuery(inputValue)
    setCountry(selectedCountry?.value || "")
  }


  const handleChange = (selectedOption: { label: string; value: string; flag: string } | null) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div className="border-[1px] border-gray-300 dark:border-gray-700 rounded-lg p-[8px] w-[70vw] mb-6 bg-white dark:bg-gray-800 text-black dark:text-white">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full">
    
    {/* Search Input */}
    <div className="flex items-center px-3 md:w-1/2 sm:w-full border-r border-gray-300  dark:border-gray-700">
      <FaSearch className="text-gray-500 dark:text-gray-300" />
      <input
        type="text"
        placeholder="Search job title or keyword"
        className="w-full p-2 outline-none bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        onChange={handleSearchChange}
        value={inputValue}
      />
    </div>

    {/* Location Input */}
    <div className="flex items-center px-3 md:w-1/2 sm:w-full">
      <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300" />
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleChange}
        placeholder="Select a country"
        className="w-full"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            color: 'black',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'white', // Tailwind's dark:bg-gray-800
            color: 'black',
          }),
          singleValue: (base) => ({
            ...base,
            color: 'black',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#9ca3af', // Tailwind's gray-400
          }),
        }}
        formatOptionLabel={(e) => (
          <div className="flex items-center">
            <img src={e.flag} alt={e.label} className="w-5 h-4 mr-2" />
            {e.label} ({e.value.toUpperCase()})
          </div>
        )}
      />
    </div>

    {/* Search Button */}
    <button
      onClick={handleClick}
      className="bg-green-600 whitespace-nowrap text-white px-6 py-3 font-medium rounded-lg shadow-md hover:bg-green-700"
    >
      Find jobs
    </button>
  </div>
</div>

  );
};

export default SearchBar;











  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSearchQuery(inputValue); 
  //   }, 1000); 

  //   return () => clearTimeout(timer);
  // }, [inputValue, setSearchQuery]);




// import { useState, useEffect } from "react";
// import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import CountrySelector from "../Home/CountrySelect";


// const SearchBar = ({ setSearchQuery }: any) => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [selectedCountry, setSelectedCountry] = useState<{ label: string; value: string; flag: string } | null>(null);


//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setSearchQuery(inputValue);
//   //   }, 1000);

//   //   return () => clearTimeout(timer);
//   // }, [inputValue, setSearchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setSearchQuery(inputValue);
//   };
//   return (
//     <>
//         <div className="border-[1px] border-gray-300 rounded-lg p-[8px] w-full mb-6">
//       <div className="flex justify-between items-center overflow-hidden shadow-sm">
//         {/* Search Input */}
//         <div className="flex items-center px-3 w-1/2 border-r border-gray-300">
//           <FaSearch className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search job title or keyword"
//             className="w-full p-2 outline-none bg-transparent"
//             onChange={handleSearchChange}
//             value={inputValue}
//           />
//         </div>
//       <CountrySelector />
//     </div>
//     </div>
//     </>
//   )
// }

// export default SearchBar
