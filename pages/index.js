import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react"
import {useRouter} from "next/router"
import searchAPI from "../utils/searchAPI"
import MoviePreview from '../components/MoviePreview'

export default function Home({freshData}) {
  const router = useRouter()
  const [ data, setData] = useState(freshData)
  const [search, setSearch]= useState(router.query.search || "toy story")

  const handleSubmit = e => {
    e.preventDefault()
    // router.push(`/?search=${search}`) DONT DELETEs
    async function run(){
      let res = await searchAPI(search,1)
      setData({...res})
    }
    run()
  }

  const handleLoad = e =>{
    e.preventDefault()
    if(data.page < data.total_pages){
      async function run(){
        let res = await searchAPI(search , data.page+1)
        setData({...res,results: [...data.results,...res.results]})
      }
      run()
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{router.query.search ? `${router.query.search} Movies` : "Movie App - Danilo"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Find movies online using themoviedb.org"/>
        <meta name="keywords" content={`NEXTJS, javascript, ${router.query.search}, realdanilo, movie application, reactjs`} />
        <meta name="author" content="danilo mera"/>

      </Head>


      <main>
        <form onSubmit={(e)=> handleSubmit(e)} className={styles.form}>
            <label>Search: </label>
            <input type="text" onChange={(e)=> setSearch(e.target.value)} value={search}/>
            <button type="submit">&#128269;</button>
        </form>
        <div className={styles.movieFrame}>
          {data.results.length ===0 && (
            <p className={styles.noResults}>No Results! OMG</p>
          )}
          {data && data.results.map((movie) =>(
            movie.poster_path && <MoviePreview {...movie} key={movie.id} />
          ))}
       </div>
       {data.page < data.total_pages && (
          <button className={styles.loadMore} onClick={handleLoad}>
            Load More
          </button>
        )}
      </main>

      
    </div>
  )
}


export async function getServerSideProps(context){
  let freshData = await searchAPI(context.query.search)
  return{
    props:{
      freshData,

    }
  }
}