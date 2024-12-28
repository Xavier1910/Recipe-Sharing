package com.frostandfeast.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    // Get all recipes
    @GetMapping("/AllRecipes")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    // Get recipes for a specific user (excluding the current user)
    @GetMapping
    public List<Recipe> getRecipes(@RequestParam("user_email") String userEmail) {
        return recipeService.getRecipesExcludingUser(userEmail);
    }

    // Add a new recipe with image
    @PostMapping("/add")
    public ResponseEntity<String> addRecipe(@RequestParam("recipe_name") String recipeName,
                                            @RequestParam("recipe_description") String recipeDescription,
                                            @RequestParam("category") String category,
                                            @RequestParam("user_email") String userEmail,
                                            @RequestParam("ingredients") List<String> ingredients, // Accept as JSON array
                                            @RequestParam("steps") List<String> steps, // Accept as JSON array
                                            @RequestParam("image") MultipartFile image) throws IOException {

        // Save image to public/uploads folder
        String imageName = saveImage(image);

        // Create a new recipe object
        Recipe recipe = new Recipe();
        recipe.setRecipeName(recipeName);
        recipe.setRecipeDescription(recipeDescription);
        recipe.setCategory(category);
        recipe.setUserEmail(userEmail);
        recipe.setIngredients(ingredients); // Directly set the ingredients list
        recipe.setSteps(steps); // Directly set the steps list
        recipe.setImage("/uploads/" + imageName);
        recipe.setRating(0.0);
        recipe.setNumberOfUsers(0);

        // Save the recipe to the database
        recipeRepository.save(recipe);

        return ResponseEntity.status(HttpStatus.CREATED).body("Recipe added successfully!");
    }

    private String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "D:/full stack/React js/ChristmasReceipe/christmas_receipe/public/uploads/";
        
        // Ensure the directory exists
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }

        // Save the image
        String imageName = image.getOriginalFilename();
        Path savePath = Paths.get(uploadDir + imageName);
        Files.write(savePath, image.getBytes());

        return imageName; // Return the image name
    }
    @DeleteMapping("/delete/{recipeId}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long recipeId) {
        if (!recipeRepository.existsById(recipeId)) {
            return ResponseEntity.notFound().build(); // Return 404 if the recipe doesn't exist
        }

        recipeRepository.deleteById(recipeId);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    @PutMapping("/update/{recipeId}")
    public ResponseEntity<String> updateRecipe(
        @PathVariable Long recipeId,
        @RequestBody RecipeUpdateRequest updateRequest
    ) {
        Optional<Recipe> recipeOpt = recipeRepository.findByRecipeId(recipeId);
        if (recipeOpt.isPresent()) {
            Recipe existingRecipe = recipeOpt.get();
            existingRecipe.setRating(updateRequest.getRating());
            existingRecipe.setNumberOfUsers(updateRequest.getNumberOfUsers());
            recipeRepository.save(existingRecipe);
            return ResponseEntity.ok("Recipe updated successfully.");
        }
        return ResponseEntity.status(404).body("Recipe not found.");
    }
  
}
