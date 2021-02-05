import axios from "axios"

async function searchAPI(search = "toy story", page = 1){
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.movie_api}&query=${search}&page=${page}`,{
        "Content-Type":"Application/JSON"
      })
    return data
}

export default searchAPI