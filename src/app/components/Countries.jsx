'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchForCountry from './search-options/SearchForCountry';
import DropdownForRegion from './search-options/DropdownForRegion';
import PageLoader from './loading/PageLoader';
import SpinnerLoader from './loading/SpinnerLoader';

const Countries = ({ query, setIsOpen }) => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;

  const API_URL = selectedRegion
    ? `https://restcountries.com/v3.1/region/${selectedRegion}`
    : 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json();

        console.log('API URL:', API_URL);
        console.log('Countries Data:', data);

        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error.message);
      }
      setIsLoading(false)
    };

    getCountriesData();
  }, [API_URL]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  }

  const renderPageNumbers = () => {
    const pageCount = Math.ceil(countries.length / countriesPerPage);
    const pageNumbers = [];
    const numSpread = <span className="text-gray-300 text-2xl">. . .</span>;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-2 pb-1 hover:text-orange-300 ${currentPage === i ? 'underline text-orange-400' : 'text-gray-200'
              }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pageNumbers.push(numSpread);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      {isLoading ? (
        <div className='h-screen flex flex-col justify-center space-y-4'>
          <h1><PageLoader /></h1>
          <p className='relative bottom-[5rem] text-4xl font-bold text-center text-gray-500'>Loading...</p>
        </div>
      ) : (
        <>
          <div className='flex flex-col w-full px-4 my-6 space-y-10'>
            <SearchForCountry />
            <DropdownForRegion onRegionSelect={handleRegionSelect} />
          </div>
          {isLoading ? (
            <SpinnerLoader />
          ) : (

            <div className='flex flex-wrap w-full mt-28 mb-16 md:mt-16 justify-center gap-10 2xl:grid grid-cols-5'>
              {countries.slice(startIndex, endIndex).map((country) => (
                <Link href={`/countries/${country.cca2}`} key={country.cca2} className='w-[285px] hover:opacity-60 transform duration-200 ease-in'>
                  <div className='flex flex-col'>
                    <Image
                      src={country.flags.svg}
                      alt={country.flags.alt || 'no alt description available'} width={500}
                      height={500}
                      className='rounded-t w-full h-[200px] object-cover'
                    />
                  </div>
                  <div className='bg-gray-700 text-gray-300 flex-1 p-6 rounded-b'>
                    <h1 className='text-lg text-white font-bold mb-3'>{country.name.common}</h1>
                    <p><span className='text-neutral-200 font-semibold'>Population:</span> {country.population.toLocaleString()}</p>
                    <p><span className='text-neutral-200 font-semibold'>Region:</span> {country.region}</p>
                    {!country.capital}
                    <p><span className='text-neutral-200 font-semibold'>Capital:</span> {country?.capital || (
                      <span className='text-rose-300 text-sm italic'>{`${country.name.common} has no official capital city.`}</span>
                    )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              className={`px-2 pb-1 hover:text-orange-400 ${currentPage === 1 ? 'text-gray-200' : 'text-gray-200'}`}
              onClick={() => handlePageChange(1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            {renderPageNumbers()}
            <button
              className={`px-2 pb-1 hover:text-orange-400 ${currentPage === Math.ceil(countries.length / countriesPerPage) ? 'bg-gray-800 text-white' : 'text-gray-200'}`}
              onClick={() => handlePageChange(Math.ceil(countries.length / countriesPerPage))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  )
};

export default Countries;