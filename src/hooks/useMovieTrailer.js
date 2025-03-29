import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTrailer } from '../utils/store/movieSlice'

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    
    const getMovieVideos = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
            const json = await data.json()
            const trailer = json.results.find((files) => files.type === "Trailer")
            if (trailer) {
                dispatch(addTrailer(trailer))
            }
        } catch (error) {
            console.error('Error fetching movie trailer:', error)
        }
    }

    useEffect(() => {
        if (movieId) {
            getMovieVideos()
        }
    }, [movieId, dispatch])

}

export default useMovieTrailer
