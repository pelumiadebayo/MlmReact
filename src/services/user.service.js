import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/v1/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
// const getUserbyId = (id) => {
//  axios.get(API_URL + "user/" + id, { headers: authHeader() })   
//   .then(response => {
//     return response;
//   });
// };
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  // getUserbyId
};