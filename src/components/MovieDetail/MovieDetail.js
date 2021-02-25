import React from "react";
import Rating from "../../containers/Rating";

import "./MovieDetail.css";

const MovieDetail = ({
  title,
  tagline,
  image,
  rating,
  releaseDate,
  genres = [],
  description,
  onBackClick,
}) => {
  return (
    <div className="MovieDetail-container">
      <div className="heading">
        <h1 className="title">{title}</h1>
        <button className="back-button" onClick={onBackClick}>
          Back
        </button>
      </div>
      <h5 className="tagline">{tagline}</h5>
      <img src={image} alt={title} className="cover" />

      <div className="MovieDetail-info">
        <Rating selectedStars={rating} disableSelect />
        <p className="release-date">
          Relase Date: <span>{releaseDate}</span>
        </p>
        <div className="genres">
          {genres.map((genre, i) => (
            <span key={i}>{genre}</span>
          ))}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
