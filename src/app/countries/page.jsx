'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchForCountry from '../components/search-options/SearchForCountry';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const API_URL = 'https://restcountries.com/v3.1/all';

  useEffect(() => {
    const getCountriesData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      // console.log('Countries Data:', data);
      setCountries(data);

    };
    getCountriesData();
  }, []);

  return (
    <>
      <SearchForCountry />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {countries && countries.map((country) => (
          <Link href={`/countries/${country.cca2}`} key={country.cca2} className='w-[285px] hover:opacity-60 transform duration-200 ease-in'>          <div className='flex flex-col'>
            <Image
              src={country.flags.svg}
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
          </Link>
        ))}
      </div>
    </>
  );
};

export default Countries;