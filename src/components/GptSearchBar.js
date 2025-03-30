import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { lang } from '../utils/languageConstants'
import useMovieSearch from '../hooks/useMovieSearch'
import Toast from './Toast'

const GptSearchBar = () => {
  const defaultLanguage = useSelector((store) => store.appConfig.defaultLanguage)
  const [searchText, setSearchText] = useState("")
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' })
  const { isLoading, error, searchMovies } = useMovieSearch()

  const handleSearchClick = () => {
    searchMovies(searchText);
  };

  // Show toast when error changes
  React.useEffect(() => {
    if (error) {
      setToast({ show: true, message: error, type: 'error' });
    }
  }, [error]);
  
  return (
    <div className='pt-[10%] flex justify-center items-center'>
      <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder={lang[defaultLanguage].searchPlaceholder} 
          className='col-span-9 p-4 m-4 rounded-lg' 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
          disabled={isLoading}
        />
        <button 
          className='col-span-3 m-4 px-4 py-2 bg-red-700 text-white rounded-lg disabled:opacity-50' 
          onClick={handleSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : lang[defaultLanguage].search}
        </button>
      </form>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'error' })} 
        />
      )}
    </div>
  )
}

export default GptSearchBar