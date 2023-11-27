import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-gray-800'>
      <body className={inter.className}>
        <main className='bg-gray-800'>
          <Header />
          <section className=' container mx-auto px-24'>
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
