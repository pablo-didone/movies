import React from "react";

import "./MovieSearch.css";

const MovieSearch = ({ onChange, onSearch, onClear, query = "", disabled }) => {
  return (
    <form className="MovieSearch-container">
      <input value={query} onChange={onChange} name="query" />
      <button
        type="submit"
        disabled={disabled}
        onClick={onSearch}
        className="search"
      >
        Search
      </button>
      <button disabled={disabled} onClick={onClear} className="clear">
        Clear
      </button>
    </form>
  );
};

export default MovieSearch;
