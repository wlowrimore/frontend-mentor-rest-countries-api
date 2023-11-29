'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import DropdownForRegion from './DropdownForRegion';

// Debounce Fn to Wrap SearchHandler and Act as AbortController.  This keeps the Fetch Function From Calling API With Every Keystroke.
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }
}

const SearchForCountry = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [searchedCountry, setSearchedCountry] = useState(searchParams.get('query') || '');
  const [details, setDetails] = useState()

  const inputElem = useRef(null);

  // Handle Search with Debouncer to Minimize API Requests
  const handleSearch = useCallback(debounce(query => fetchCountryResults(query), 500))

  // Fetch Searched Country
  const fetchCountryResults = async (query) => {
    setSearchedCountry(query);
    try {
      if (query !== '') {
        const res = await fetch(`https://restcountries.com/v3.1/name/${query}?fullText=true`)
        const data = await res.json();

        if (data && data.length > 0) {
          setDetails(data);
        } else {
          console.log('Something went wrong!')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // SubmitHandler Grabs CountryCode from SearchedCountry, Updates the URL and Carries the CountryCode Over to the CountryCode Details Page.
  const handleSubmit = (e) => {
    e.preventDefault();
    const countryCode = details?.length > 0 ? details[0]?.cca2 : '';
    console.log('COUNTRY CODE:', countryCode);
    const params = new URLSearchParams(searchParams);
    if (searchedCountry) {
      params.set('query', searchedCountry);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    push(`/countries/${countryCode}`);
  };

  return (
    <div className='my-14 flex flex-col md:flex-row justify-between'>
      <div className='flex w-full'>
        <div className='w-12'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-[3rem] py-3 bg-gray-700 text-white rounded-tl rounded-bl">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <form className='flex w-full h-12 justify-between' onSubmit={handleSubmit}>
          <input
            ref={inputElem}
            onChange={() => handleSearch(inputElem.current?.value)}
            placeholder='Search for a country...'
            className='w-1/3 py-2 bg-gray-700 text-white placeholder:text-xs outline-none rounded-tr rounded-br'
          />
        </form>

        {/* Dropdown for Region */}

      </div>
    </div>
  );
};

export default SearchForCountry;
