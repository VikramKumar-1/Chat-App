import type { Product } from "../types/Product"
import axios from "axios"


const API_URL = "https://fakestoreapi.com"

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`)
  return response.data
}

export const getCategories = async (): Promise<string[]> => {
const response = await axios.get<string[]>(`${API_URL}/products/categories`)
return response.data
}


