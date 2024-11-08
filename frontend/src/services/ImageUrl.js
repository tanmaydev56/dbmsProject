// src/services/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/product_images';

export const fetchImgUrl = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
