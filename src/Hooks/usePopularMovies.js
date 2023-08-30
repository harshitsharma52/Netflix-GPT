import { useDispatch, useSelector } from "react-redux";
import {addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const usePopularMovies=()=>{
      //Fetch data from TMDB api and update the store
        const dispatch=useDispatch();

        const popularMovies=useSelector(store=>store.movies.popularMovies);

        const getPopularMovies= async ()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS );
        const json=await data.json();
        dispatch(addPopularMovies(json.results));


        }

        useEffect(()=>{
          if(!popularMovies) getPopularMovies();

        },[]);

}

export default usePopularMovies;