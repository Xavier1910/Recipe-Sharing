import React from "react";

const StarRating = ({ rating, onChange }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const stars = [
    ...Array(fullStars).fill('bi-star-fill'),
    ...Array(halfStars).fill('bi-star-half'),
    ...Array(emptyStars).fill('bi-star')
  ];

  // Handle click to update rating
  const handleStarClick = (index) => {
    if (onChange) onChange(index + 1);
  };

  return (
    <div>
      {stars.map((star, index) => (
        <i
          key={index}
          className={`bi ${star}`}
          style={{ color: "#ffcc00", fontSize: "1.2em", cursor: "pointer" }}
          onClick={() => handleStarClick(index)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
