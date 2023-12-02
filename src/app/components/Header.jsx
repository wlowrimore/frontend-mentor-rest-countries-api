import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
const Header = () => {
  return (
    <div className='md:text-lg lg:text-xl dark:bg-gray-700 dark:text-gray-300 flex justify-between mx-auto w-full py-6 px-4 md:px-20 lg:px-[2.8rem] xl:px-[5.5rem] 2xl:pr-[11rem] 2xl:pl-[11.5rem]'>
      <div>
        <Link href='/'><h1 className='hover:opacity-50 transform transition duration-300'>Where in the world?</h1></Link>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

export default Header