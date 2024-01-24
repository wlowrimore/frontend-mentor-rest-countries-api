'use client'

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
      setIsOpen(false);
    }
  }, [selectedRegion]);

  return (
    <div className="text-xs mx-5 w-[90%] md:w-[40%] xl:w-[40%] 2xl:w-[30%] flex flex-col text-neutral-300 absolute z-10 top-[12rem] md:top-[13.6%] xl:top-[15.3%] 2xl:top-[11.8%] md:left-[67.2%] lg:left-[65%] xl:right-[50%] 2xl:left-[74.3%]">
      <section
        onClick={toggleMenu}
        className='dark:bg-gray-700 shadow flex justify-between items-center w-[50%] h-12 py-2 px-6 rounded cursor-pointer'
      >
        <span className='text-gray-700 dark:text-gray-300'>Filter by Region</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-4 h-4 ml-8 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </section>

      <section
        className={`w-full dark:bg-gray-700 bg-white dark:text-gray-300 text-gray-800 shadow mt-[0.2rem] rounded py-4 px-3 ${!isOpen ? 'opacity-0 ' : 'opacity-100 transform transition-all duration-500 ease-in-out'
          }`}
      >
        <div className='relative z-10 '>
          <ul className='space-y-1'>
            {regions.map((region, regIndex) => (
              <li
                key={regIndex}
                onClick={() => { onRegionSelect(`${region}`); setSelectedRegion(`${region}`) }}
                className={`hover:bg-gray-800/30 w-4/5 rounded py-1 px-3 cursor-pointer ${region === selectedRegion ? 'bg-gray-800/30' : ''
                  }`}
              >
                {region}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DropdownForRegion;