'use client'

import { useEffect, useState } from 'react';

const BorderCountries = ({ borders }) => {
  const [borderCountryNames, setBorderCountryNames] = useState([]);

  useEffect(() => {
    const fetchBorderCountryNames = async () => {
      try {
        if (borders && borders.length > 0) {
          const borderNames = await Promise.all(
            borders.map(async (border) => {
              const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
              const data = await res.json();
              return data?.[0]?.name?.common || border;
            })
          );
          setBorderCountryNames(borderNames);
        }
      } catch (error) {
        console.error('Error fetching border country names:', error);
      }
    };

    fetchBorderCountryNames();
  }, [borders]);

  if (!borders || borders.length === 0) {
    return null; // or render a default message
  }

  return (
    <div className='flex gap-3 text-gray-300 text-sm'>
      <h2 className='pr-1'>Border Countries: </h2>
      {borderCountryNames.map((borderName, bordersIndex) => (
        <div key={bordersIndex}>
          <p className='bg-gray-700 text-xs py-1 px-6'>{borderName}</p>
        </div>
      ))}
    </div>
  );
};

export default BorderCountries;