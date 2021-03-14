import React from 'react'
import styles from "../styles/Casting.module.css"
const Casting = ({actors}) => {
    return (
        <div className={styles.actors}>
            {actors.slice(0,17).map((actor)=>(
                actor.profile_path && (

                    <div className={styles.actor} key={actor.id}>
                    <img src={ `https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name}/>
                    <h5>{actor.name}</h5>
                    <p>{actor.character}</p>
                </div>
            )
            ))}
        </div>
    )
}

export default Casting
