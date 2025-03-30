import { useState } from 'react';
import { useDispatch } from 'react-redux';
import openai from '../utils/openai';
import { addGptMovieResult } from '../utils/store/gptSlice';
import { API_OPTIONS } from '../utils/constants';

const handleApiError = (error, context = '') => {
  // Handle network errors
  console.log(error,'error')
  if (!navigator.onLine) {
    return "Please check your internet connection and try again.";
  }

  // Handle rate limiting
  if (error.status === 429) {
    return "We're experiencing high traffic right now. Please wait a minute before trying again.";
  }

  // Handle authentication errors
  if (error.status === 401 || error.status === 403) {
    return "There's an issue with the service access. Please try again later.";
  }

  // Handle server errors
  if (error.status === 500 || error.status === 503) {
    return "Our service is temporarily unavailable. Please try again in a few minutes.";
  }

  // Handle not found errors
  if (error.status === 404) {
    return context ? `No results found for "${context}". Try a different search term.` : "No results found. Please try a different search.";
  }

  // Handle request errors
if (error.request) {
    return "Unable to connect to our service. Please check your connection and try again.";
  }

  // Default error message
  return "Something went wrong. Please try again later.";
};

const searchMovieTMDB = async (movie) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    
    if (!data.ok) {
      throw { response: { status: data.status } };
    }
    
    const json = await data.json();
    return json.results;
  } catch (error) {
    console.error(`Error searching for movie ${movie}:`, error);
    throw error;
  }
};

const useMovieSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const searchMovies = async (searchText) => {
    if (!searchText.trim()) {
      setError("Please enter a search query to find movie recommendations");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query : ${searchText}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      try {
        const gptResults = await openai.chat.completions.create({
          messages: [{ role: "user", content: gptQuery }],
          model: "gpt-3.5-turbo",
        });

        if (!gptResults.choices?.[0]?.message?.content) {
          throw new Error("Unable to generate recommendations. Please try again.");
        }

        const gptMovies = gptResults.choices[0].message.content.split(",").map(movie => movie.trim());
        
        try {
          const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
          const tmdbResults = await Promise.all(promiseArray);

          dispatch(
            addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
          );
        } catch (tmdbError) {
          throw tmdbError;
        }
      } catch (openaiError) {
        throw openaiError;
      }
    } catch (error) {
      setError(handleApiError(error, searchText));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    searchMovies
  };
};

export default useMovieSearch; 