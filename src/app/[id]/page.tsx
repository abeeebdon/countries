"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const url = `https://restcountries.com/v3.1/name/${id}?fullText=true`;
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <main>
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 component p-2 shadow border-none outline-none cursor-pointer"
        >
          <FaArrowLeft />
          <p>Back</p>
        </button>
      </div>
    </main>
  );
};

export default page;
