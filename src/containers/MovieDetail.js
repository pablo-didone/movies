import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Message from "../components/Message/Message";

import MovieDetailLayout from "../components/MovieDetail/MovieDetail";

import { IMAGE_API_URL } from "../config";
import { loadMovie } from "../services/http";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setError(false);

    (async function () {
      try {
        const res = await loadMovie(id);
        setMovie(res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const genres =
    movie && movie.genres ? movie.genres.map((genre) => genre.name) : [];
  const image = movie.poster_path
    ? `${IMAGE_API_URL}/${movie.poster_path}`
    : null;
  const rating = Math.trunc(movie.vote_average / 2);

  return (
    <Layout>
      {loading ? (
        <Message>Loading</Message>
      ) : error ? (
        <Message type="error">Error, please reload</Message>
      ) : (
        <MovieDetailLayout
          title={movie.title}
          tagline={movie.tagline}
          image={image}
          rating={rating}
          releaseDate={movie.release_date}
          genres={genres}
          description={movie.overview}
          onBackClick={() => history.goBack()}
        />
      )}
    </Layout>
  );
};

export default MovieDetail;
