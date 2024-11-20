import axios from "axios";
import { useToast } from "vue-toastification";
import { jwtDecode } from "jwt-decode";

const api_url = "http://localhost:8080";
const toast = useToast();
// user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${api_url}/user/login`, {
      email,
      password,
    });
    if (response.data) {
      const decodedToken = jwtDecode(response.data);
      console.log(decodedToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: decodedToken.id,
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        })
      );
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(function () {
        toast.success("Login successfully !");
      }, 2500);
    } else {
      toast.error("Login failed: Invalid response from server.");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(
      `Login failed: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${api_url}/user/register`, {
      name,
      email,
      password,
    });
    if (response.data) {
      toast.success("Register Successfully! Please confirm your email.");
    }
  } catch (error) {
    toast.error(
      "Registration failed: " +
        (error.response ? error.response.data.message : error.message)
    );
  }
};

// product
export const GetProducts = async () => {
  try {
    const response = await axios.get(`${api_url}/product`);
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/product/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

//categories
export const GetCategories = async () => {
  try {
    const response = await axios.get(`${api_url}/category`);
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

//cart
// Get all cart items
export const fetchCart = (userId) => {
  try {
    const response = axios.get(`${api_url}/cart/${userId}`);
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

// Add an item to the cart
export const addItemToCart = (item) => {
  try {
    const response = axios.post(`${api_url}/cart/add`, item);
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

// Update item quantity
export const updateCartItemQuantity = (id, quantity) => {
  try {
    const response = axios.put(`${api_url}/cart/${id}`, { quantity });
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

// Remove item from cart
export const removeItemFromCart = (id) => {
  try {
    const response = axios.delete(`${api_url}/cart/${id}`);
    return response;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
