
import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTopRatedMovies } from '../utils/store/movieSlice'
const useTopRatedMovies = ()=>{
    const dispatch = useDispatch()

    const getTopRatedMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS)
        const data = await response.json()
        dispatch(addTopRatedMovies(data.results))
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
  
    useEffect(() => {
      getTopRatedMovies()
    }, [])
}

export default useTopRatedMovies