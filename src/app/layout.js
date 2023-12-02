import { Nunito_Sans as NunitoSans } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from './components/Header'

const nunito = NunitoSans({ subsets: ['latin'], weights: ['300, 600, 800'] })

export const metadata = {
  title: 'Search Countries',
  description: 'A Next.js App that integrates the Rest Countries API for searching countries world-wide',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark:bg-gray-800 {nunito.className}`}>
        <Providers>
          <main className='dark:bg-gray-800'>
            <Header />
            <section className='container content-center mx-auto mb-12 dark:bg-gray-800'>
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
