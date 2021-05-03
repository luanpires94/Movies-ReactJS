import axios from 'axios'

const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=674e056a0305570de7e7dea12691bb59"
})


export default apiMovies