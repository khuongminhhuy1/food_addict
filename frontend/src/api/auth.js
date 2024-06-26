import axios from "axios";
import { useToast } from "vue-toastification";
import { jwtDecode } from "jwt-decode";

const api_url = "http://localhost:8080";
const toast = useToast();

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${api_url}/user/login`, {
      email,
      password,
    });
    if (response.data) {
      setTimeout(() => {
        const decodedToken = jwtDecode(response.data);
        console.log(decodedToken);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
          })
        );
        toast.success("Login successful !");
      }, 3000);
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
