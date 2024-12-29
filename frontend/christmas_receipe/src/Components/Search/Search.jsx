import React, { useState, useEffect } from "react";
import './Search.css';
import StarRating from "../StarRating";
import fetchRecipes from "../RecipeFetch";


const Search = ({ onRecipeSelect }) => {
  const RecentSearchQuery=localStorage.getItem('searchQuery')||"";
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(RecentSearchQuery); 
  const [loading, setLoading] = useState(true);  

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true); 
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);  
    };

    getRecipes();
  }, []);

  const Recipes_without_currentUser = recipes.filter((item) => item.userEmail !== userEmail);

  const filteredRecipes = Recipes_without_currentUser
    .filter((item) => 
      item.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.rating - a.rating);

  const handleRecipeClick = (recipeName) => {
    onRecipeSelect(recipeName);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem('searchQuery', e.target.value);
  };

  return (
    <div id="SearchContainer">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <p className="InputSearchIcon">
          <i className="bi bi-search"></i>
        </p>
      </div>

      {loading ? (
        <div className="loader">Loading...</div> 
      ) : (
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
            <h3>No recipes found</h3>  
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
