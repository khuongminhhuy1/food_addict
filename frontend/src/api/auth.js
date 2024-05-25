import axios from "axios";

const api_url = "http://localhost:8080";

export const login = (email, password) => {
  return axios.post(`${api_url}/user/login`, { email, password });
};
export const register = (name, email, password) => {
  return axios.post(`${api_url}/user/register`, { name, email, password });
};
