import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
  return movies && (
    <div className='px-6 py-4'>
        <h1 className='text-3xl text-white py-4'>{title}</h1>
        <div className='relative'>
            <div className='flex overflow-x-scroll scrollbar-hide'>
                <div className='flex gap-4'>
                    {
                        movies.map((movie)=>(<MovieCard key={movie.id} posterPath={movie.poster_path}/>))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieList