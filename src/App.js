import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites"

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d887ba1a`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      console.log(responseJson);
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
  
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const removeFavouritesMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  
  
  
  const addFavouriteMovie = (movie) => {
    const newFavouriteList  = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  }

  return (
    <div className='container-fluid movie-app'>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = "Movies" />
        <SearchBox searchValue = {searchValue} setSearchValue= {setSearchValue}/>
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent = {AddFavorites}/> 
      </div>


      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = "Favourites" />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieList movies={favourites} handleFavouritesClick={removeFavouritesMovie} favouriteComponent = {RemoveFavourites}/> 
      </div>


      
    </div>
  );
}

export default App;
