'use client'
import BorderCountries from '@/app/components/BorderCountries';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const router = useRouter();
  const [countryDetails, setCountryDetails] = useState(null);
  const [coatOpen, setCoatOpen] = useState(false);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        if (countryCode) {
          const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          setCountryDetails(data);
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  useEffect(() => {
    if (countryDetails) {
      const languagesObject = countryDetails[0]?.languages || {};
      const languagesArray = Object.values(languagesObject);

      console.log('Country Details:', countryDetails);
      console.log('Languages Array:', languagesArray);
    }
  }, [countryCode, countryDetails]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const languagesObject = countryDetails[0]?.languages || {};
  const languagesArray = Object.values(languagesObject);

  // console.log('Borders:', countryDetails[0].borders)

  return (
    <>
      {coatOpen && (
        <div className='bg-gray-700 flex flex-col justify-center items-center absolute top-0 left-0 right-0 w-full h-full z-50'>
          <Image
            src={countryDetails[0]?.coatOfArms?.svg}
            alt='coat of arms'
            width={1000}
            height={1000}
            className='w-[40rem] h-[40rem] p-20 bg-gray-300 rounded-full'
          />
          <span onClick={(e) => setCoatOpen(false)} className='absolute top-20 right-20 cursor-pointer text-2xl text-gray-300 hover:text-gray-400'>Close</span>
          <p className='text-3xl text-gray-200 font-bold mt-4'>{countryDetails[0]?.name?.common}'s&nbsp;Coat of Arms</p>
        </div>
      )}

      <div className='relative mt-10 md:my-20 2xl:mt-44 px-6 w-full flex flex-col'>
        <button onClick={() => router.back()} className='bg-gray-700 w-fit flex justify-center itmes-center gap-2 text-gray-300 text-xs md:text-sm py-1 md:py-2 px-4 md:px-7 mb-14 md:mb-20 lg:mb-0 xl:mb-8 md:ml-[6.7rem] lg:ml-0 rounded hover:bg-transparent transform transition duration-300'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </span>
          Back
        </button>
        <section className='w-full flex flex-col md:items-center lg:flex-row lg:gap-6 xl:gap-32'>
          <div className='md:w-fit md:h-[400px]'>
            <Image
              src={countryDetails[0]?.flags?.svg}
              alt={countryDetails[0]?.flags?.alt || 'No alt description found'}
              width={500}
              height={800}
              className='aspect-video h-full object-cover'
            />
          </div>
          {/* Info Text Box */}
          <div className='flex flex-col py-8 md:py-16 text-white justify-start w-full md:justify-evenly md:w-2/3'>
            <div className='flex w-full mb-8 cursor-pointer'>
              <span onClick={(e) => setCoatOpen(true)} className='items-center text-sm'>
                <Image
                  src={countryDetails[0]?.coatOfArms?.svg}
                  alt='coat of arms'
                  width={400}
                  height={100}
                  className='w-10 mr-4 bg-gray-200 rounded-full px-2 py-2'
                />
              </span>
              <h1 className='w-full flex items-center text-lg md:text-3xl font-bold text-start text-white'>{countryDetails[0]?.name?.common}
              </h1>
            </div>
            <div className='flex flex-col md:flex-row text-sm text-gray-300 w-full lg:gap-32'>
              <div className='flex flex-col w-full'>
                {Array.isArray(countryDetails) && countryDetails.map((detail, detIndex) => (
                  <div key={detIndex} className='text-sm md:text-md space-y-1 md:space-y-2'>
                    <p className='font-bold'>Official Name: {detail?.name?.official}</p>
                    {countryDetails[0]?.population && (
                      <p className='font-bold'>Population: <span className='font-light'>{countryDetails[0]?.population.toLocaleString()}</span></p>
                    )}
                    <p className='font-bold'>Region: <span className='font-light'>{detail?.region}</span></p>
                    <p className='font-bold'>Sub Region: <span className='font-light'>{detail?.subregion}</span></p>
                    <p className='font-bold'>Capital: <span className='font-light'>{detail?.capital}</span></p>
                  </div>
                ))}
              </div>
              <div className='text-gray-300 w-full flex flex-col md:items-end xl:items-start'>
                {Array.isArray(countryDetails) && countryDetails.map((detail, detIndex) => (
                  <div key={detIndex} className='text-sm md:text-md space-y-1 mb-10'>
                    <p className='font-bold'>UN Status:&nbsp; <span className='font-light'>{detail?.unMember ? 'Member' : 'Non-Member'}</span></p>
                    <p className='font-bold'>Top Level Domain:&nbsp; <span className='font-light'>{detail?.tld}</span></p>
                    {countryDetails[0]?.currencies && (
                      <div className='flex space-x-2'>
                        <h2 className='font-bold'>Currencies:</h2>
                        <ul>
                          {Object.entries(countryDetails[0]?.currencies).map(([code, currency]) => (
                            <li key={code} className='font-light'>
                              {currency.name || currency} ( {currency.symbol || ''} )
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {languagesArray.length > 0 && (
                      <div className='flex gap-2'>
                        <p className='font-bold'>Languages:</p>
                        <p className='font-light'>{languagesArray.join(', ')}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <BorderCountries borders={countryDetails[0]?.borders} />
          </div>
        </section>
      </div>
    </>
  );
}

export default CountryDetails;