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
        }
    }
})

export const {addNowPlayingMovies,addTrailer} = movieReducer.actions

export default movieReducer.reducer