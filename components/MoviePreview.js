import React from 'react'
import Link from "next/link"
import styles from '../styles/MoviePreview.module.css'
//take out css to another file for Moviepreviewmodulecss

function MoviePreview({id, original_title, overview, poster_path}) {
   
    return (
        <Link href={`/movie?id=${id}`}  key={id}>
        <a>
          <section className={styles.movieInfo}>
            <div className={styles.movieInfoImg}>
              <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={original_title}/>
            </div>
            <div className={styles.movieInfoTxt}>
              <h3>{original_title}</h3>
              <p>{overview.substring(0,80)}...</p>
            </div>
        </section>
      </a>
      </Link>
    )
}

export default MoviePreview
