import axios from "axios"

export default async function getMovieInfo (id){
    // let video = await axios.get(`https://api.themoviedb.org/3/movie/${id}/?api_key=${process.env.movie_api}`)
    let video = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.movie_api}&language=en-US`)
    return video
}