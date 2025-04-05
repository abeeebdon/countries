"use client";

import ContinentFilter from "@/components/ContinentFilter";
import { ContinentOptions } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface ReqData {
  name: {
    common: string;
  };
}
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(url);

        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, [url]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const filteredCountries = countries.filter((country: any) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + countriesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  console.log(currentCountries);
  return (
    <main className="px-6">
      <article className="mt-6 py-6 flex-between">
        <div className="w-full sm:max-w-xs bg-dark-blue flex items-center gap-6 p-5 rounded-md">
          <label>
            <FaSearch />
          </label>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search for a country ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-none outline-none"
          />
        </div>
        <ContinentFilter setUrl={setUrl} />
      </article>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCountries.map((country: any, index) => (
          <article key={index} className=" rounded shadow max-w-xs">
            <Image
              src={country.flags.svg}
              alt={country.name.common}
              width={200}
              height={100}
              className="w-full h-[200px]"
            />
            <div>
              <h2>{country.name.common}</h2>

              <div className="space-y-2">
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <div className="mt-10 py-10 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;
