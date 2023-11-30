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
              // console.log('border logged from BorderCountries.jsx:', data)

              const borderCountryName = await data?.[0].name?.common
              const borderCountryCode = await data?.[0].cca2

              console.log('Border Country Names:', borderCountryName)
              console.log('Border Country Codes:', borderCountryCode)

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
    return 'There are no bordering countries.';
  }

  return (
    <div className="flex flex-wrap gap-3 text-gray-300 text-sm">
      <h2 className="pr-1">Border Countries: </h2>
      {borderCountryData.map(({ borderCountryName, borderCountryCode }, index) => (
        <div key={index}>
          <Link href={`/countries/${borderCountryCode}`}>
            <p className="bg-gray-700 text-xs py-1 px-6 flex w-full rounded hover:bg-transparent transform transition duration-300">{borderCountryName}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BorderCountries;
