import React from 'react'
import getMovieInfo from "../utils/getMovieInfo"
import styles from "../styles/Movie.module.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Casting from "../components/casting"
import MoviePreview from "../components/MoviePreview"


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
    let vote_average = data.vote_average ? (data.vote_average *10 ): 0
    console.log(similar)
    
    return (
        <div className={styles.main} >
            <div style={{backgroundImage:`url(http://image.tmdb.org/t/p/w500/${data.poster_path})`}} className={styles.backgroundImg}>
                <div className={styles.backgroundCover}/>
                <div className={styles.info}>
                    <section className={styles.pictureFormat}>
                      <img src={`http://image.tmdb.org/t/p/w400/${data.poster_path}`} alt={data.title}/>
                    </section>
                    <section className={styles.infoText}>
                      <h3 className={styles.title}>{data.title}</h3>
                      <span className={styles.releaseDate}>{data.release_date && data.release_date.slice(0,4)}</span>
                      <span className={styles.time}>{dataTime}</span>
                      <div className={styles.vote}>
                        <CircularProgressbar  value={vote_average}  text={`${vote_average}%`} 
                        styles={{ 
                          path: {
                            // Path color
                            stroke: `rgba(54, 224, 91, ${vote_average / 100})`,
                          },
                          text: {
                            // Text color
                            fill: '#fff',
                            // Text size
                            fontSize: '30px',
                          },
                          background: {
                            fill: '#000',
                          },
                          trail: {
                            // Trail color
                            stroke: 'white',
                          },
                          }} />
                      </div>
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
              <section className={styles.cast}>
               <Casting actors={cast.cast}/>
              </section>
              <section className={styles.extraInfo}>
                <h5>Status</h5>
                <p>{data.status}</p>
                <h5>Original Language</h5>
                <p>{data.original_language.toUpperCase()}</p>
                <h5>Budget</h5>
                <p>${data.budget.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                <h5>Revenue</h5>
                <p>${data.revenue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                <h5>Net</h5>
                <p>${(data.revenue - data.budget).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
              </section>
            </div>
            <div className={styles.similar}>
              {similar.results.map(movie => <MoviePreview movie={movie}/>)}
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