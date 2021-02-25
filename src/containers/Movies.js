import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { loadMovies, searchMovie } from "../services/http";
import { IMAGE_API_URL } from "../config";

import Movie from "../components/Movie/Movie";
import MovieSearch from "../components/MovieSearch/MovieSearch";
import useForm from "../hooks/useForm";
import Message from "../components/Message/Message";
import Rating from "./Rating";
import Layout from "../components/Layout/Layout";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const { formData, clearForm, handleInputChange } = useForm({});
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleFilterByRating = async (stars) => {
    if (stars === ratingFilter) setRatingFilter(ratingFilter - 1);
    else setRatingFilter(stars);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    setError(false);
    setLoading(true);
    setEmpty(false);

    try {
      const movies = await searchMovie(formData.query);
      setFilteredList(movies);
      if (movies.length === 0) setEmpty(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearForm();
    setError(false);
    setEmpty(false);
    setFilteredList([]);
    setRatingFilter(0);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);

      try {
        const movies = await loadMovies();
        setMovieList(movies);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const descriptionMaxLength = 200;
  const disableButtons =
    !formData.query || formData.query.length === 0 || error;

  const queryFilteredList = filteredList.length > 0 ? filteredList : movieList;
  const ratingFilteredList =
    ratingFilter > 0
      ? queryFilteredList.filter(
          (item) => Math.trunc(item.vote_average / 2) === ratingFilter
        )
      : queryFilteredList;

  return (
    <Layout>
      {error ? (
        <Message type="error">An error occured</Message>
      ) : (
        <div style={{ width: "100%" }}>
          <MovieSearch
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={handleClear}
            query={formData.query}
            disabled={disableButtons}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 50,
              width: "100%",
            }}
          >
            <p>Filter by rating: </p>
            <Rating
              onSelect={handleFilterByRating}
              selectedStars={ratingFilter}
            />
          </div>

          {loading ? (
            <Message>Loading</Message>
          ) : empty ? (
            <Message>No movies found</Message>
          ) : ratingFilteredList.length === 0 ? (
            <Message>No movies found</Message>
          ) : (
            ratingFilteredList.map((movie) => (
              <div
                key={movie.id}
                onClick={() => history.push(`/movies/${movie.id}`)}
              >
                <Movie
                  image={`${IMAGE_API_URL}/${movie.poster_path}`}
                  title={movie.title}
                  description={movie.overview.slice(0, descriptionMaxLength)}
                  rating={Math.trunc(movie.vote_average / 2)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default Movies;
