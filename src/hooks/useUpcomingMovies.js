
import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/store/movieSlice'
const useUpcomingMovies = ()=>{
    const dispatch = useDispatch()
    const upcomingMovies = useSelector((store)=>store.movies.upcomingMovies)


    const getPopularMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
        const data = await response.json()
        dispatch(addUpcomingMovies(data.results))
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
  
    useEffect(() => {
      !upcomingMovies && getPopularMovies()
    }, [])
}

export default useUpcomingMovies