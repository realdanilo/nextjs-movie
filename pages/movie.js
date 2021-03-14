import React from 'react'
import getMovieInfo from "../utils/getMovieInfo"
import styles from "../styles/Movie.module.css"

const timeConvert = (min) => {
  if(min ===0 ) return "0"
  let hours  = min / 60 
  let rhours = Math.floor(hours)
  let minutes = (hours - rhours) * 60
  let rminutes = Math.round(minutes)
  return  `${rhours}h: ${rminutes}min`
}

const movie = ({ main: data, similar, cast}) => {
    let dataTime = timeConvert(data.runtime)
    console.log(data)
    
    return (
        <div className={styles.main} >
            <div style={{backgroundImage:`url(http://image.tmdb.org/t/p/w500/${data.poster_path})`}} className={styles.backgroundImg}>
                <div className={styles.backgroundCover}/>
                <div className={styles.info}>
                    <section className={styles.pictureFormat}>
                      <img src={`http://image.tmdb.org/t/p/w300/${data.poster_path}`} alt={data.title}/>
                    </section>
                    <section className={styles.infoText}>
                      <h3 className={styles.title}>{data.title}</h3>
                      <span className={styles.releaseDate}>{data.release_date && data.release_date.slice(0,4)}</span>
                      <span className={styles.time}>{dataTime}</span>
                      <span className={styles.vote}>{data.vote_average}</span>
                      <ul className={styles.genres}>
                        {data.genres.map((genre, id)=><li key={id}>{genre.name}</li>)}
                      </ul>
                      <h6 className={styles.tagline}>{data.tagline}</h6>
                      <h2 className={styles.overview}>Overview</h2>
                      <p className={styles.overviewText}>{data.overview.slice(0,800)}</p>
                    </section>
                </div>
            </div>
            <div className={styles.extra}>
              <section>
                casting crew first 10
              </section>
              <section>
                <h5>Status</h5>
                <p>{data.status}</p>
                <h5>Original Language</h5>
                <p>{data.original_language.toUpperCase()}</p>
                <h5>Budget</h5>
                <p>${data.budget}</p>
                <h5>Revenue</h5>
                <p>${data.revenue}</p>
              </section>
            </div>
        </div>
    )
}

export default movie

export async function getServerSideProps(context){
     let {main,similar, cast} = await getMovieInfo(parseInt(context.query.id))
      
      return{
        props:{
          main,
          similar,
          cast
        }
      }
    }