package com.frostandfeast.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

   
    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating); 
    }
    public List<Rating> getRatingsByUserEmailAndRecipeId(String userEmail, Long recipeId) {
        return ratingRepository.findByUserEmailAndRecipeId(userEmail, recipeId);
    }


	

}
