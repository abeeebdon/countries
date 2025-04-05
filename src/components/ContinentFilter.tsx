"use client";
import { useState } from "react";
import Select from "react-select";
import { continentOptions } from "./Data";
import { ContinentFilterProps } from "@/types";
const ContinentFilter = ({ setUrl }: ContinentFilterProps) => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const handleChange = (selectedOption: any) => {
    setSelectedContinent(selectedOption);
    !selectedOption
      ? setUrl("https://restcountries.com/v3.1/all")
      : setUrl(`https://restcountries.com/v3.1/region/${selectedOption.value}`);
  };
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "hsl(209, 23%, 22%)",
      borderColor: "transparent",
      padding: "15px",
      boxShadow: "none",
      color: "white",
      "&:hover": {
        borderColor: "transparent",
        cursor: "pointer",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "hsl(209, 23%, 22%)",
      color: "white",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2563EB" // Tailwind's blue-600
        : state.isFocused
          ? "#3B82F6" // Tailwind's blue-500
          : "#1E3A8A", // Tailwind's blue-800
      color: "white",
      cursor: "pointer",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="max-w-60 w-full">
      <Select
        options={continentOptions}
        value={selectedContinent}
        onChange={handleChange}
        placeholder="Filter by continent"
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default ContinentFilter;
