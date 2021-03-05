import axios from "axios";

const API_URL = "http://localhost:8080/v1/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
const registerMod = (username, email, password) => {
  return axios.post(API_URL + "signupModerator", {
    username,
    email,
    password,
  });
};
const registerAdmin = (username, email, password) => {
  return axios.post(API_URL + "signupAdmin", {
    username,
    email,
    password,
  });
};

const getAllAdmins = () => {
  return axios.get(API_URL + "getAllAdmins");
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  registerMod,
  registerAdmin,
  getAllAdmins
};