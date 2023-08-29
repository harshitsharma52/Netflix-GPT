
import Header from './Header'
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {

  //Fetch data from TMDB api and update the store
  useNowPlayingMovies();
  
  return (
    <div>
      <Header/> 
      <MainContainer/>
      <SecondaryContainer/> 
    </div>
  )
}

export default Browse;