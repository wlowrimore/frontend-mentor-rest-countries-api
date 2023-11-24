import CountriesFetch from "./components/fetch-countries/CountriesFetch"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl capitalize underline font-bold text-emerald-700'>
        rest countries api challenge
      </h1>
      <CountriesFetch />
    </main>
  )
}
