"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BorderCountries = ({ borders }) => {
  const [borderCountryData, setBorderCountryData] = useState([]);

  useEffect(() => {
    const fetchBorderCountryData = async () => {
      try {
        if (borders && borders.length > 0) {
          const borderData = await Promise.all(
            borders.map(async (border) => {
              const res = await fetch(
                `https://restcountries.com/v3.1/alpha/${border}`
              );
              const data = await res.json();

              const borderCountryName = await data?.[0].name?.common
              const borderCountryCode = await data?.[0].cca2

              return { borderCountryName, borderCountryCode }
            })
          );
          setBorderCountryData(borderData);
        }
      } catch (error) {
        console.error("Error fetching border country names:", error);
      }
    };

    fetchBorderCountryData();
  }, [borders]);

  if (!borders || borders.length === 0) {
    return (
      <div className='text-gray-500'>
        <p>There are no bordering countries</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col text-sm md:text-md">
      <h2 className=" dark:text-gray-300 text-gray-700 md:pr-1 md:mt-8 md:mb-2 font-bold">Border Countries: </h2>
      <section className='flex flex-wrap w-full'>
        {borderCountryData.map(({ borderCountryName, borderCountryCode }, index) => (
          <div key={index} className='flex mr-1 my-1'>
            <Link href={`/countries/${borderCountryCode}`} className=''>
              <p className="dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm md:text-md dark:py-1 dark:px-6 pr-6 flex w-full rounded-sm md:rounded dark:hover:bg-transparent hover:underline hover:text-black transform transition duration-300">{borderCountryName}</p>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BorderCountries;
