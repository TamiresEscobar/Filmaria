import axios from 'axios'
// https://api.themoviedb.org/3/movie/now_playing?api_key=04753c800f01e7aa9455d47085cbaa51

// base url



const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export default api






