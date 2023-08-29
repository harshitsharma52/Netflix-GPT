import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";

 const useMovieTrailer=(movieId)=>{

        //Fetch trailer video from api and updating the store with trailer video

        const dispatch=useDispatch();
        const getMovieVideo = async () =>{

            const data= await fetch("https://api.themoviedb.org/3/movie/" +
            movieId + 
            "/videos?language=en-US", API_OPTIONS);
    
            const json= await data.json();

            const filterData=json.results.filter(video => video.type=="Trailer"); //multiple trailers are there
            const trailer=filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailerVideo(trailer));
        }
     
        useEffect(()=>{
            getMovieVideo();
    
        },[]);
    
 
 }
 export default useMovieTrailer;