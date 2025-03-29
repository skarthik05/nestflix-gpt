
import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/store/movieSlice'
const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch()

    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
        const data = await response.json()
        dispatch(addNowPlayingMovies(data.results))
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
  
    useEffect(() => {
      getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies