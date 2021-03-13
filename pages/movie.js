import React from 'react'
import getMovieInfo from "../utils/getMovieInfo"
import styles from "../styles/Movie.module.css"

const movie = ({ routeId,data}) => {
    console.log(routeId)
    
    return (
        <div className={styles.main} >
            <div style={{backgroundImage:`url(http://image.tmdb.org/t/p/w500/${data.poster_path});`}} className={styles.backgroundImg}>
                <div className={styles.backgroundCover}/>
                {/* <img className={styles.backgroundImg} src={`http://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.original_title}/> */}
            </div>
        </div>
    )
}

export default movie

export async function getServerSideProps(context){
     let {data} = await getMovieInfo(parseInt(context.query.id))
      
      return{
        props:{
          data,
          routeId:context.query.id
    
        }
      }
    }