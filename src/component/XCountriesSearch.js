import React, { useEffect, useState } from 'react'

import DisplayFlags from './DisplayFlags'
const XCountriesSearch = () => {
  
const [searchData, setSearchData]=useState([])
const [searchTerm, setSearchTerm]=useState('');
const [loading, setLoading]=useState(true)
const [debounce, setDebounce]=useState(searchTerm);  



useEffect(()=>{
  const handler = setTimeout(() => {
      setDebounce(searchTerm)
  },1);

  return ()=>{
    clearTimeout(handler)
  }
},[searchTerm])


  const handleSearch = async()=>{
setLoading(true)

console.log(debounce)
    try{
      
      let response;
      
      if(debounce)
      {
          response = await fetch(`https://restcountries.com/v3.1/name/${debounce}`)

          const finalData = await response.json();

          // const filteredData = finalData.filter((country)=>country.name.common.toLowerCase().includes(debounce.toLowerCase()))
          setSearchData(finalData)
      }
      else
      {
          response = await fetch('https://restcountries.com/v3.1/all')
          const finalData = await response.json();
          setSearchData(finalData)
      }
      
      
      
    
    }
    catch(error)
    {
      console.error("Error while fetching data:",error)
    }

    finally{
      setLoading(false)
    }
    // console.log(searchData)
  }


  useEffect(()=>{
    handleSearch();
  },[])


  useEffect(()=>{
    handleSearch()
  },[debounce])

 
useEffect(()=>{
  console.log("Updated Searchdata", searchData)
},[searchData])  


    return (
   <>
   <input type='text' onChange={(e)=>setSearchTerm(e.target.value)} name='searchbox'/>
   {loading ? (<p>Loading...</p>): searchData.length>0 ? 
   (<DisplayFlags searchData={searchData}/>):(<p>No Countries Found</p>)}
   </>
  )
}

export default XCountriesSearch