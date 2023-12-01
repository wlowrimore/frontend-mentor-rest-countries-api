import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='md:text-lg lg:text-xl bg-gray-700 text-white flex justify-between mx-auto w-full py-6 px-4 md:px-20 lg:px-[2.8rem] xl:px-[5.5rem] 2xl:pr-[11rem] 2xl:pl-[11.5rem]'>
      {/* <div className='2xl:container flex justify-between w-screen 2xl:pr-16'> */}
      <div>
        <Link href='/'><h1 className='hover:opacity-50 transform transition duration-300'>Where in the world?</h1></Link>
      </div>
      <div className='flex items-center gap-2 text-sm md:text-md lg:text-lg'>
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>

        Dark Mode
      </div>
      {/* </div> */}
    </div>
  )
}

export default Header