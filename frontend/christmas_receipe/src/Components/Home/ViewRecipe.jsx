import React, { useEffect, useState } from "react";
import fetchRecipes from "../RecipeFetch";
import "./ViewRecipe.css";
import StarRating from "../StarRating";
import axios from "axios";

const ViewRecipe = ({ selectedRecipe, onBack, text }) => {
  const [rating, setRating] = useState([]);
  const [recipe, setRecipes] = useState([]);
  const [recipeRating, setRecipeRating] = useState(0);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const user = await axios.get("http://localhost:8080/api/users");
        const fetchedRecipes = await fetchRecipes();
        setUsers(user.data);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    getRecipes();
  }, []);

  const recipeDetails = recipe.find(
    (recipeDetails) => recipeDetails.recipeName === selectedRecipe
  );

  if (!recipeDetails) {
    return <div>Recipe not found!</div>;
  }


  const userEmail = localStorage.getItem("email");

  const fetchData = async () => {
    // Fetching logic here
    const recipeDetails = recipe.find(
      (recipeDetails) => recipeDetails.recipeName === selectedRecipe
    );
    if (userEmail && recipeDetails?.recipeId) {
      const response = await axios.get(
        "http://localhost:8080/rating/getRatings",
        { params: { userEmail, recipeId: recipeDetails.recipeId } }
      );
      setRating(response.data);
    }
  };
  if (recipeDetails && rating.length === 0) {
    fetchData();
  }

  const handlePostRating = async () => {
    if (recipeRating !== 0) {
      const isConfirmed = window.confirm(
        "Are you sure you want to post a new rating?"
      );
      if (isConfirmed) {
        try {
          const newNumberOfUsers = recipeDetails.numberOfUsers + 1;
          const newAverageRating = (
            (recipeDetails.rating * recipeDetails.numberOfUsers +
              recipeRating) /
            newNumberOfUsers
          ).toFixed(1);

          const ratingData = {
            recipeId: recipeDetails.recipeId,
            rating: recipeRating,
            userEmail: userEmail,
          };

          await axios.post(
            "http://localhost:8080/rating/addRating",
            ratingData
          );

          await axios.put(
            `http://localhost:8080/recipes/update/${recipeDetails.recipeId}`,
            {
              rating: newAverageRating,
              numberOfUsers: newNumberOfUsers,
            }
          );

          setUpdatedRecipe({
            ...recipeDetails,
            rating: newAverageRating,
            numberOfUsers: newNumberOfUsers,
          });

          alert(`Thank you for rating! Your rating: ${recipeRating}`);
        } catch (error) {
          console.error("Error posting rating:", error);
          alert("An error occurred while posting the rating.");
        }
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want delete the recipe?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/recipes/delete/${recipeDetails.recipeId}`
        );

        if (response.status === 204) {
          alert("Recipe deleted successfully!");
          onBack();
        } else {
          alert("Failed to delete the recipe.");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("An error occurred while deleting the recipe.");
      }
    }
  };

  const displayRecipe = updatedRecipe || recipeDetails;
  var userRating;
  if (rating.length > 0) {
    userRating = rating.find((r) => r.userEmail === userEmail)?.rating;
  }
  console.log(displayRecipe)
  let userDetail
 if(displayRecipe){
  userDetail = users.filter(
    (user) => user.email === displayRecipe.userEmail
  );
  
 }
  return (
    <div id="ViewRecipeContainer">
      <button onClick={onBack} className="BackButton">
        Back to {text}
      </button>
      {text && text === "Your Recipes" && (
        <button onClick={handleDelete} className="DeleteButton">
          Delete Your Recipe
        </button>
      )}
      <div className="RecipeInfo">
        <div className="RecipeImage">
          <div className="RecipeName_Rating">
            <div className="Recipe_name_author">
              <h1>{displayRecipe.recipeName}</h1>
              <p>posted by {userDetail[0].name}</p>
            </div>
            <div id="RecipeRating">
              <span>
                <StarRating rating={displayRecipe.rating} />
              </span>
              <span>
                {displayRecipe.rating} ({displayRecipe.numberOfUsers})
              </span>
            </div>
          </div>
          <img src={displayRecipe.image} alt={displayRecipe.recipeName} />
        </div>
        <div className="RecipeIngredients">
          <h2>Ingredients:</h2>
          <ul>
            {displayRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <div id="RecipeDetails">
        <p>{displayRecipe.recipe_description}</p>
      </div>
      <div className="RecipeCookingSteps">
        <h2>Cooking Steps:</h2>
        <ol>
          {displayRecipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {text && text !== "Your Recipes" && (
        <div className="RatingSection">
          <h2>Rate this Recipe</h2>
          {userRating ? (
            <div className="RatingItem">
              <h4>Your Rating</h4>
              <b>:</b>
              <StarRating rating={userRating} />
              <span>{userRating}</span>
            </div>
          ) : (
            <div className="RatingItem">
              <h4>Your Rating</h4>
              <b>:</b>
              <StarRating rating={recipeRating} onChange={setRecipeRating} />
              <span>{recipeRating}</span>
            </div>
          )}

          {!userRating && (
            <button onClick={handlePostRating} className="PostRatingButton">
              Post Rating
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
