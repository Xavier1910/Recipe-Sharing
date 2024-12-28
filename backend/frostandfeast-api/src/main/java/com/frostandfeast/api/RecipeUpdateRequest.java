package com.frostandfeast.api;

public class RecipeUpdateRequest {
    private double rating;
    private int numberOfUsers;

    // Getters and setters
    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getNumberOfUsers() {
        return numberOfUsers;
    }

    public void setNumberOfUsers(int numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }
}
