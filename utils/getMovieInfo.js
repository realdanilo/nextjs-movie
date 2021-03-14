import axios from "axios"

export default async function getMovieInfo (id){
    let {data: main} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.movie_api}&language=en-US`)
    let {data: similar} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.movie_api}&language=en-US&page=1`)
    let {data: cast} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.movie_api}&language=en-US`)
  
    return {main, similar,cast}
}