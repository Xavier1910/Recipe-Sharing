import React, { useState } from "react";
import "./AddRecipe.css";
import axios from "axios";

const AddRecipe = ({onback}) => {
  const userEmail = localStorage.getItem("email");
  const [recipe, setRecipe] = useState({
    user_email: userEmail,
    recipe_name: "chicken varuval",
    recipe_description: "qweroiwjvnwkjvnkjw",
    category: "Main Course",
    ingredients: [
      { ingredient: "Chicken", quantity: "500", unit: "kg" },
      { ingredient: "paprika", quantity: "1", unit: "tsp" },
    ],
    image: "/images/placeholder.png",
    steps: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "qqqqqqqqqqqqqqqqqqqqqq"],
  });

  const ingredientUnits = ["g", "kg", "ml", "l", "cup", "tbsp", "tsp", "piece"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index][name] = value;
    setRecipe((prev) => ({
      ...prev,
      ingredients,
    }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { ingredient: "", quantity: "", unit: "" },
      ],
    }));
  };

  const removeIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe((prev) => ({
      ...prev,
      ingredients,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleImageDelete = () => {
    const ImageUrlInput = document.getElementById("ImageUrlInput");
    ImageUrlInput.value = "";
    setRecipe((prev) => ({
      ...prev,
      image: "/images/placeholder.png",
    }));
  };
  const handleStepChange = (index, e) => {
    const { value } = e.target;
    const steps = [...recipe.steps];
    steps[index] = value;
    setRecipe((prev) => ({
      ...prev,
      steps,
    }));
  };

  const addStep = () => {
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const removeStep = (index) => {
    const steps = [...recipe.steps];
    steps.splice(index, 1);
    setRecipe((prev) => ({
      ...prev,
      steps,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipe_name", recipe.recipe_name);
    formData.append("recipe_description", recipe.recipe_description);
    formData.append("category", recipe.category);
    formData.append("user_email", recipe.user_email);
    const formattedIngredients = recipe.ingredients.map(
      (ing) => `${ing.quantity} ${ing.unit} ${ing.ingredient}`
    );
    formData.append("ingredients", formattedIngredients);
    formData.append("steps", recipe.steps);
    if (recipe.image !== "/images/placeholder.png") {
      const imageFile = document.querySelector("#ImageUrlInput").files[0];
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/recipes/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      onback();
    } catch (error) {
      console.error("There was an error submitting the recipe!", error);
      alert("Error submitting the recipe!");
    }
  };
  return (
    <div className="addRecipeContainer">
      <h1 className="pageTitle">Add a New Recipe</h1>
      <form className="recipeForm" onSubmit={handleSubmit}>
        <div className="RecipeHead">
          <div className="RecipeHeadDetails">
            <div className="formGroup">
              <label className="formLabel">Recipe Name</label>
              <input
                type="text"
                name="recipe_name"
                value={recipe.recipe_name}
                onChange={handleChange}
                className="formInput"
                required
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Recipe Description</label>
              <textarea
                name="recipe_description"
                value={recipe.recipe_description}
                onChange={handleChange}
                className="formTextarea"
                required
              ></textarea>
            </div>

            <div className="formGroup">
              <label className="formLabel">Category</label>
              <select
                name="category"
                value={recipe.category}
                onChange={handleChange}
                className="formSelect"
                required
              >
                <option value="">Select Category</option>
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Breakfast">Breakfast</option>
              </select>
            </div>
          </div>
          <div className="RecipeImageUpload">
            <label className="formLabel">Recipe Image</label>

            {recipe.image && (
              <div className="imagePreview">
                <div className="RecipeImageContainer">
                  <img
                    src={recipe.image}
                    alt="Recipe"
                    className="previewImage"
                  />
                </div>
              </div>
            )}
            <div className="formGroup recipeFileUpload">
              <input
                type="file"
                accept="image/*"
                id="ImageUrlInput"
                onChange={handleImageChange}
                className="formInput"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                className="deleteImageBtn"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="ingredientsContainer">
          <div className="ingredientHead">
            <h3 className="ingredientsTitle">Ingredients</h3>
            <span>
              <button
                type="button"
                onClick={addIngredient}
                className="addIngredientBtn"
              >
                Add Ingredient
              </button>
            </span>
          </div>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredientRow">
              <input
                type="text"
                name="ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredient"
                className="ingredientInput"
                required
              />
              <input
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Quantity"
                className="ingredientInput"
                required
              />
              <select
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                className="ingredientSelect"
                required
              >
                <option value="">Unit</option>
                {ingredientUnits.map((unit, idx) => (
                  <option key={idx} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {recipe.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="removeIngredientBtn"
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="formGroup">
          <div className="CookingStepHead">
            <h3 className="ingredientsTitle">Cooking Steps</h3>
            <span>
              <button type="button" onClick={addStep} className="addStepBtn">
                Add Step
              </button>
            </span>
          </div>
          <div className="stepsContainer">
            {recipe.steps.map((step, index) => (
              <div key={index} className="stepRow">
                <span>{`Step ${index + 1}`}</span>
                <textarea
                  value={step}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder={`Step ${index + 1}`}
                  className="stepInput"
                  required
                ></textarea>
                {recipe.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="removeStepBtn"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submitBtn">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
