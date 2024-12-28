package com.frostandfeast.api;



import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByUserEmailNot(String userEmail);
    Optional<Recipe> findByRecipeId(Long recipeId);

}
