// src/services/categoryService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
