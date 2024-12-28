package com.frostandfeast.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
    public List<Recipe> getRecipesExcludingUser(String userEmail) {
        return recipeRepository.findByUserEmailNot(userEmail);
    }
}
