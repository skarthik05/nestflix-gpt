
import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/store/movieSlice'
const usePopularMovies = ()=>{
    const dispatch = useDispatch()
    const popularMovies = useSelector((store)=>store.movies.popularMovies)


    const getPopularMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)
        const data = await response.json()
        dispatch(addPopularMovies(data.results))
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
  
    useEffect(() => {
      !popularMovies && getPopularMovies()
    }, [])
}

export default usePopularMovies