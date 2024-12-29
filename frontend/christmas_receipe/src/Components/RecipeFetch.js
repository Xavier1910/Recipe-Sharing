// const userEmail = 'user@example.com'; 

import axios from 'axios';

const fetchRecipes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/recipes/AllRecipes');
        return response.data;
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return []; 
    }
};
export default fetchRecipes;

