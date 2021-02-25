import {
  API_KEY,
  DISCOVER_API_URL,
  SEARCH_API_URL,
  MOVIE_DETAIL_API_URL,
} from "../config";

export const loadMovies = async () => {
  try {
    const res = await fetch(`${DISCOVER_API_URL}?api_key=${API_KEY}`);
    if (res.status > 400 && res.status < 500) throw new Error("Bad Request");

    const data = await res.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const searchMovie = async (query) => {
  try {
    const res = await fetch(
      `${SEARCH_API_URL}?api_key=${API_KEY}&query=${query}`
    );
    if (res.status > 400 && res.status < 500) throw new Error("Bad Request");
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const loadMovie = async (movieId) => {
  try {
    const res = await fetch(
      `${MOVIE_DETAIL_API_URL}/${movieId}?api_key=${API_KEY}`
    );
    if (res.status > 400 && res.status < 500) throw new Error("Bad Request");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
