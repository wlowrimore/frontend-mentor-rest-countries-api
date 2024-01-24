import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { Noto_Sans } from 'next/font/google'

const noto = Noto_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

const Header = () => {
  return (
    <div className='md:text-lg lg:text-xl dark:bg-gray-700 dark:text-gray-300 flex flex-col items-center md:flex-row justify-between mx-auto w-full py-6 px-4 md:px-20 lg:px-[2.8rem] xl:px-[5.5rem] 2xl:pr-[11rem] 2xl:pl-[11.5rem] border-b-2 border-gray-300'>
      <div>
        <Link href='/'><h1 className={`${noto.className} tracking-wider text-center text-2xl md:text-4xl hover:opacity-50 transform transition duration-300`}>Where in the world?</h1></Link>
        <h2 className='text-center md:text-start'>Find information on any country</h2>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

export default Header