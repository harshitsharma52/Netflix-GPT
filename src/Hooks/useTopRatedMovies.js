import { useDispatch, useSelector } from "react-redux";
import {addTopRatedMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useTopRatedMovies=()=>{
      //Fetch data from TMDB api and update the store
        const dispatch=useDispatch();

        const topRatedMovies=useSelector(store=>store.movies.topRatedMovies);


        const getTopRatedMovies= async ()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS );
        const json=await data.json();
        dispatch(addTopRatedMovies(json.results));


        }

        useEffect(()=>{
          if(!topRatedMovies) getTopRatedMovies();

        },[]);

}

export default useTopRatedMovies;