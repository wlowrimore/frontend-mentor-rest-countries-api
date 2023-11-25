'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

const CountryCard = () => {
  const [countries, setCountries] = useState([]);

  const API_URL = 'https://restcountries.com/v3.1/all';

  useEffect(() => {
    const getCountriesData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCountries(data);
    };
    getCountriesData();
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
      {countries && countries.map((country, ctsIndex) => (
        <div key={ctsIndex} className='w-[285px]'>
          <div className='flex flex-col'>
            <Image
              src={country.flags.png}
              alt={country.flags.alt || 'no alt description available'} width={500}
              height={500}
              className='rounded-t w-full h-[200px] object-cover'
            />
          </div>
          <div className='bg-gray-700 text-gray-300 flex-1 p-6 rounded-b'>
            <h1 className='text-lg text-white font-bold mb-3'>{country.name.common}</h1>
            <p><span className='text-neutral-200 font-semibold'>Population:</span> {country.population}</p>
            <p><span className='text-neutral-200 font-semibold'>Region:</span> {country.region}</p>
            <p><span className='text-neutral-200 font-semibold'>Capital:</span> {country.capital}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryCard;