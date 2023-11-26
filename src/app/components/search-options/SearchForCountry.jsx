import React from 'react'
import DropdownForRegion from './DropdownForRegion'

const SearchForCountry = () => {
  return (
    <div className='my-10 flex justify-between'>
      <div className='flex w-full'>
        <div className='w-12 h-[2.7rem]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-[2.7rem] py-3 bg-gray-700 text-white rounded-tl rounded-bl">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <div className='flex w-full justify-between'>
          <input
            type='text'
            placeholder='Search for a country...'
            className='h-[2.7rem] w-1/3 py-2 bg-gray-700 text-white placeholder:text-xs outline-none rounded-tr rounded-br'
          />
        </div>
        <div>
          <DropdownForRegion />
        </div>
      </div>
    </div>
  )
}

export default SearchForCountry