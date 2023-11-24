'use client'

import { useState, useEffect } from 'react'

const CountriesFetch = () => {

  const API_URL = 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    const getCountriesData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data)
    }
    getCountriesData()
  }, [])

  return (
    <div>CountriesFetch</div>
  )
}

export default CountriesFetch