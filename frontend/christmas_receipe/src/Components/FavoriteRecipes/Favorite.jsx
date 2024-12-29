import React, { useState, useEffect } from "react";
import './Favorite.css';
import StarRating from "../StarRating";
import fetchRecipes from "../RecipeFetch"; 

const Favorite = ({ onRecipeSelect }) => {
  
  const Selected_category=localStorage.getItem('SelectedCategory')||"Main Course";

  const [selectedCategory, setSelectedCategory] = useState(Selected_category);
  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    const getRecipes = async () => {
      const fetchedRecipes = await fetchRecipes(); 
      setRecipes(fetchedRecipes);
    };

    getRecipes();
  }, []); 
  const userEmail = localStorage.getItem("email");


const Recipes_without_currentUser = recipes.filter((item) => item.userEmail === userEmail);

const filteredRecipes = Recipes_without_currentUser
  .filter((item) => item.category === selectedCategory)
  .sort((a, b) => b.rating - a.rating);

const categories = [...new Set(Recipes_without_currentUser.map((item) => item.category))];


  const handleRecipeClick = (recipeName) => {
    onRecipeSelect(recipeName); 
  };
  const handleCategoryChange = (category) => {
    localStorage.setItem('SelectedCategory', category);
    setSelectedCategory(category);
  };

  return (
    <div id="FavoriteContainer">
      <div className="tabs-container">
        <div className="tabs">
          {categories.map((category, index) => (
            <button
              key={index}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item, index) => (
            <div
              key={index}
              className="recipe-card"
              onClick={() => handleRecipeClick(item.recipeName)}
            >
              <img src={item.image} alt={item.recipeName} />
              <h3>{item.recipeName}</h3>
              <div id="RecipeRating">
                <span>
                  <StarRating rating={item.rating} />
                </span>
                <span>
                  {item.rating} ({item.numberOfUsers})
                </span>
              </div>
              <p>{item.recipeDescription}</p>
            </div>
          ))
        ) : (
          <h3>Loading recipes...</h3> 
        )}
      </div>
    </div>
  );
};

export default Favorite;
