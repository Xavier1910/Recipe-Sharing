package com.frostandfeast.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

 
    @PostMapping("/addRating")
    public ResponseEntity<String> AddRating(@RequestBody Rating rating) {
        try {
            ratingService.saveRating(rating);
            return ResponseEntity.status(201).body("Rating posted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/getRatings")
    public ResponseEntity<List<Rating>> getRatingsByUserEmailAndRecipeId(
        @RequestParam String userEmail, @RequestParam Long recipeId) {
        
        List<Rating> ratings = ratingService.getRatingsByUserEmailAndRecipeId(userEmail, recipeId);
        
        if (ratings.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        
        return ResponseEntity.ok(ratings); // Return 200 with ratings
    }


}

