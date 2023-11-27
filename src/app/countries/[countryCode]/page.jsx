'use client'
import BorderCountries from '@/app/components/BorderCountries';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const router = useRouter();
  // const countryCode = params.countryCode;
  const [countryDetails, setCountryDetails] = useState(null);
  console.log('Country Code:', countryCode)
  useEffect(() => {
    const fetchCountryDetails = async () => {
      // console.log('These are my Params:', params);
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
    <div className='my-20 w-full'>
      <button onClick={() => router.back()} className='bg-gray-700 w-fit flex justify-center itmes-center gap-2 text-gray-300 text-sm py-2 px-7 mb-20 rounded-md hover:bg-transparent transform transition duration-300'><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
      </svg>
      </span>
        Back
      </button>
      <section className='w-full flex gap-32'>
        <div className='w-fit flex h-[400px]'>
          <Image
            src={countryDetails[0]?.flags?.svg}
            alt={countryDetails[0]?.flags?.alt || 'No alt description found'}
            width={500}
            height={800}
            className='aspect-video h-full object-cover'
          />
        </div>
        {/* Info Text Box */}
        <div className='flex flex-col py-16 text-white justify-start w-1/2'>
          <div className='flex w-full mb-8'>
            <h1 className='w-full text-3xl font-bold text-start text-white'>{countryDetails[0]?.name?.common}</h1>
          </div>
          <div className='flex text-sm text-gray-300 w-full gap-32'>
            <div className='flex flex-col'>
              {Array.isArray(countryDetails) && countryDetails.map((detail, detIndex) => (
                <div key={detIndex} className='text-sm space-y-2'>
                  <p>Official Name: {detail?.name?.official}</p>
                  {countryDetails[0]?.population && (
                    <p>Population: {countryDetails[0]?.population.toLocaleString()}</p>
                  )}
                  <p>Region: {detail?.region}</p>
                  <p>Sub Region: {detail?.subregion}</p>
                  <p>Capital: {detail?.capital}</p>
                </div>
              ))}
            </div>
            <div className='text-sm text-gray-300 flex flex-col'>
              {Array.isArray(countryDetails) && countryDetails.map((detail, detIndex) => (
                <div key={detIndex} className='text-sm space-y-2'>
                  <p>Top Level Domain:&nbsp; {detail?.tld}</p>
                  {countryDetails[0]?.currencies && (
                    <div className='flex space-x-2'>
                      <h2>Currencies:</h2>
                      <ul>
                        {Object.entries(countryDetails[0]?.currencies).map(([code, currency]) => (
                          <li key={code}>
                            {currency.name || currency} ( {currency.symbol || ''} )
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {languagesArray.length > 0 && (
                    <div className='flex gap-2'>
                      <p>Languages:</p>
                      <p>{languagesArray.join(', ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='mt-8'>
            <BorderCountries borders={countryDetails[0]?.borders} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CountryDetails;