import { createSlice } from "@reduxjs/toolkit";

const movieReducer = createSlice({
    name:'movies',
    initialState:{
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trailerVideo:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload
        },
        addTrailer:(state,action)=>{
            state.trailerVideo = action.payload
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies = action.payload
        }
    }
})

export const {addNowPlayingMovies,addTrailer,addPopularMovies,addTopRatedMovies,addUpcomingMovies} = movieReducer.actions

export default movieReducer.reducer