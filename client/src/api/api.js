// src/api/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/products";

export async function getProducts() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function deleteProductById(id) {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function addProduct(product) {
  try {
    await axios.post(API_BASE_URL, product);
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
}

export async function updateProduct(product) {
  try {
    const { id, name, manufacturer, origin, quantity } = product;
    await axios.put(`${API_BASE_URL}/${id}`, {
      name,
      manufacturer,
      origin,
      quantity,
    });
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
}
