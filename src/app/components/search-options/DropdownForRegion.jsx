'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DropdownForRegion = ({ onRegionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const countries = await res.json();
        const uniqueRegions = Array.from(new Set(countries.map(country => country.region)));
        setRegions(uniqueRegions.filter(region => region)); // Filter out falsy values
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion !== null) {
      // Close the dropdown when a region is selected
      setIsOpen(false);
    }
  }, [selectedRegion]);

  return (
    <div className="text-xs absolute xl:right-60 xl:top-32 xl:mt-2  xl:mr-1.5 z-10 flex flex-col text-neutral-300">
      <section
        onClick={toggleMenu}
        className='bg-gray-700 flex justify-between items-center w-full h-12 py-2 px-6 mr-16 rounded cursor-pointer'
      >
        <span>Filter by Region</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </section>

      <section
        className={`relative z-10 w-full bg-gray-700 mr-16 mt-[0.2rem] rounded py-4 px-3 ${!isOpen ? 'opacity-0 ' : 'opacity-100 transform transition-all duration-500 ease-in-out'
          }`}
      >
        <ul className='space-y-1'>
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => { onRegionSelect(`${region}`); setSelectedRegion(`${region}`) }}
              className={`hover:bg-gray-800/30 w-4/5 rounded py-1 px-3 cursor-pointer ${region === selectedRegion ? 'bg-gray-800' : ''
                }`}
            >
              {region}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DropdownForRegion;