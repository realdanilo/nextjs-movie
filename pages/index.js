import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react"
import {useRouter} from "next/router"
import axios from "axios"
import searchAPI from "../utils/searchAPI"

export default function Home({data}) {
  const [search, setSearch]= useState("")
  const router = useRouter()
 

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/?search=${search}`)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{`Searching ${router.query.search}` || "Movie app"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Find movies online"/>
        <meta name="keywords" content={`NEXTJS, javascript, ${router.query.search}`} />
        <meta name="author" content="danilo mera"/>

      </Head>


      <main>
        <form onSubmit={(e)=> handleSubmit(e)} className={styles.form}>
            <label>Search: </label>
            <input type="text" onChange={(e)=> setSearch(e.target.value)} value={search}/>
            <button type="submit">Find</button>
        </form>
        <div className={styles.movieFrame}>
          {data.results.length ===0 && (
            <p className={styles.noResults}>No Results! OMG</p>
          )}
          {data && data.results.map((movie,i) =>(
            <section key={i} className={styles.movieInfo}>
              <div className={styles.movieInfoImg}>
                {movie.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title}/>
                ): (
                  <img src="/images/no-cover.png" alt={movie.original_title}/>
                )}
              </div>
              <div className={styles.movieInfoTxt}>
                <h3>{movie.original_title}</h3>
                <p>{movie.overview.substring(0,80)}...</p>
              </div>
            </section>
          ))}
        
       </div>
      </main>

      
    </div>
  )
}


export async function getServerSideProps(context){
//  console.log(context.query)
  let data = await searchAPI(context.query.search)

  return{
    props:{
      data,

    }
  }
}