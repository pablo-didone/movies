import React from "react";

import "./Rating.css";

const Rating = ({
  starCount = 5,
  selectedStars = 1,
  onSelect,
  disableSelect,
}) => {
  return (
    <div className="Rating-container">
      {Array.from({ length: selectedStars }, (_, i) => (
        <span
          className={`filled ${disableSelect ? "disabled" : ""}`}
          onClick={() => onSelect(i + 1)}
          key={i}
        ></span>
      ))}
      {Array.from({ length: starCount - selectedStars }, (_, i) => (
        <span
          className={`${disableSelect ? "disabled" : ""}`}
          onClick={() => onSelect(i + selectedStars + 1)}
          key={starCount - selectedStars + i}
        ></span>
      ))}
    </div>
  );
};

export default Rating;
