import React from "react";

import Rating from "../../containers/Rating";

import "./Movie.css";

const Movie = ({
  image = "https://via.placeholder.com/150",
  title,
  description,
  rating,
}) => {
  return (
    <div className="Movie-container">
      <img className="Movie-image" src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p className="Movie-description">{description}</p>
        <div className="rating">
          <Rating selectedStars={rating} disableSelect />
        </div>
      </div>
    </div>
  );
};

export default Movie;
