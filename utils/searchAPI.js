import axios from "axios"

// let search = window.localStorage.get("searchGlobalStorage")
async function searchAPI(search, page = 1){

    let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_movie_api}&query=${search}&page=${page}`,{
        "Content-Type":"Application/JSON"
      })
    return data
}

export default searchAPI