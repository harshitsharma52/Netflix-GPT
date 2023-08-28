import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice"

const appStore=configureStore(
    {
         reducer: {     //differnt reducer from different slices
            user: userReducer,
            movies: moviesReducer,
         },
    },
);

export default appStore;