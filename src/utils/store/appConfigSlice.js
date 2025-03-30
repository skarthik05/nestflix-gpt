import { createSlice } from "@reduxjs/toolkit";

const appConfigReducer = createSlice({
    name: "appConfig",
    initialState: {
        defaultLanguage: "en",
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.defaultLanguage = action.payload;
        },
    },
})

export const { changeLanguage } = appConfigReducer.actions;
export default appConfigReducer.reducer;


