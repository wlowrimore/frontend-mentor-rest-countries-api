import Countries from "./components/Countries"

export const metadata = {
  title: 'Search Countries',
  description: 'Search for countries using the search bar, and find countries in their regions with a dropdown options menu.',
}

export default function Home({ handleGetAllRegions }) {
  return (
    <div>
      <Countries />
    </div>
  )
}
