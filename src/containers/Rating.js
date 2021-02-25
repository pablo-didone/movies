import React from "react";

import RatingLayout from "../components/Rating/Rating";

const Rating = ({ selectedStars, onSelect, disableSelect }) => {
  const handleSelect = (stars) => {
    if (disableSelect) return false;
    onSelect(stars);
  };

  return (
    <RatingLayout
      selectedStars={selectedStars}
      onSelect={handleSelect}
      disableSelect={disableSelect}
    />
  );
};

export default Rating;
