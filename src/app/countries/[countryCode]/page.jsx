'use client'
import BorderCountries from '@/app/components/BorderCountries';
import SpinnerLoader from '@/app/components/loading/SpinnerLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const router = useRouter();
  const [countryDetails, setCountryDetails] = useState(null);
  const [coatOpen, setCoatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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

  const mapsObject = countryDetails[0]?.maps || {};
  const mapsArray = Object.values(mapsObject);
  const googleMap = mapsArray[0];
  const openStreetMap = mapsArray[1];


  const languagesObject = countryDetails[0]?.languages || {};
  const languagesArray = Object.values(languagesObject);

  // console.log('Borders:', countryDetails[0].borders)

  return (
    <>
      {isLoading ? (
        <div className='h-screen flex flex-col justify-center space-y-4'>
          <h1><PageLoader /></h1>
          <p className='relative bottom-[5rem] text-4xl font-bold text-center text-gray-500'>Loading...</p>
        </div>
      ) : (
        <>
          {coatOpen && (
            <div className='hidden bg-gray-700 md:flex flex-col justify-center items-center absolute top-0 left-0 right-0 w-full h-full z-50'>
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


          <div className='relative mt-10 md:my-20 2xl:mt-32 px-6 w-full flex flex-col'>
            <button onClick={() => router.back()} className='bg-gray-700 w-fit flex justify-center itmes-center gap-2 text-gray-300 text-xs md:text-sm py-1 md:py-2 px-4 md:px-7 mb-14 md:mb-20 lg:mb-0 xl:mb-8 md:ml-[6.7rem] lg:ml-0 rounded hover:bg-transparent transform transition duration-300'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                  <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </span>
              Back
            </button>
            <section className='w-full flex flex-col md:items-center lg:flex-row lg:gap-6 xl:gap-24 2xl:gap-16'>
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
                    {isLoading ? (
                      <SpinnerLoader />
                    ) : (
                      <>
                        {countryDetails[0]?.coatOfArms?.svg ? (

                          <Image
                            src={countryDetails[0]?.coatOfArms?.svg}
                            alt='coat of arms'
                            width={400}
                            height={100}
                            className='w-10 mr-4 bg-gray-200 rounded-full px-2 py-2'
                          />
                        ) : (null)}
                      </>
                    )}
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
                        <p className='font-bold'>Capital: <span className='font-light'>{detail?.capital || (
                          <span className='text-rose-400 text-sm italic'>{`${detail.name.common} has no official capital city.`}</span>
                        )}</span></p>
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
                          <div className='flex gap-2 pb-4'>
                            <p className='font-bold'>Languages:</p>
                            <p className='font-light'>{languagesArray.join(', ')}</p>
                          </div>
                        )}
                        <div className='w-full px-2 py-1 flex flex-col mr-6 bg-gray-900/50 border-b border-gray-700 rounded'>
                          <p className='flex justify-between font-bold py-1 tracking-wide'>
                            Maps:
                            <span className='text-end'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            </span>
                          </p>
                          <div className='flex flex-col gap-2'>
                            <Link href={googleMap}
                              target='_blank'
                              rel='noreferrer noopern'>
                              <span className='font-light text-blue-300 hover:underline'>
                                www.googlemaps.com
                              </span>
                            </Link>

                            <Link href={openStreetMap}
                              target='_blank'
                              rel='noreferrer noopern'>
                              <span className='font-light text-blue-300 hover:underline'>
                                www.openstreetmap.org
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <BorderCountries borders={countryDetails[0]?.borders} />
              </div>
            </section>
          </div>
        </>
      )}

    </>
  );
}

export default CountryDetails;