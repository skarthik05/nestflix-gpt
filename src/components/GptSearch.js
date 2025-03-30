import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptSuggestion from './GptSuggestion'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
       <div className='absolute inset-0 -z-10'>
                <img
                    src={BG_URL}
                    alt='bg-image'
                    className="w-full h-full object-cover"
                />
            </div>
      <GptSearchBar/>
      <GptSuggestion/>
    </div>
  )
}

export default GptSearch
