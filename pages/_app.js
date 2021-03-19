import '../styles/globals.css'
import {useState, useEffect} from "react"
import {SearchContext, DispatchContext} from "../context/SearchContext"


function MyApp({ Component, pageProps }) {
  const [ searchGlobal, setSearchGlobal] = useState("toy story")
  useEffect(()=>{
    window.localStorage.setItem("searchGlobalStorage",JSON.stringify(searchGlobal))
  },[searchGlobal])

  return (
    <DispatchContext.Provider value={setSearchGlobal}>
      <SearchContext.Provider value={searchGlobal}>
        <Component {...pageProps} />
      </SearchContext.Provider>
    </DispatchContext.Provider>
  )
}

export default MyApp
