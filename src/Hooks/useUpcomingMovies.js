import { useDispatch, useSelector } from "react-redux";
import {addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useUpcomingMovies=()=>{
      //Fetch data from TMDB api and update the store
        const dispatch=useDispatch();

        const upComingMovies=useSelector(store=>store.movies.upComingMovies);

        const getUpcomingMovies= async ()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS );
        const json=await data.json();
        dispatch(addUpcomingMovies(json.results));

        }

        useEffect(()=>{

          if(!upComingMovies) getUpcomingMovies();

        },[]);

}

export default useUpcomingMovies;