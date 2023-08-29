
import Header from './Header'
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../Hooks/usePopularMovies';
import useTopRatedMovies from '../Hooks/useTopRatedMovies';
import useUpcomingMovies from '../Hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  //Fetch data from TMDB api and update the store
  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();  //fetching the movies and updating the store
  useUpcomingMovies();
  
  
  return (
    <div>
      <Header/> 
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  )
}

export default Browse;