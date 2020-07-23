import axios from "axios";
import { BACKEND_URL } from "../app.constants";

const API_URL = process.env.REACT_APP_SERVER + "/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("user", response.data.data.user);
      }

      return response.data;
    });
};

const logout = ({ setLogin }) => {
  localStorage.removeItem("token");
  setLogin({ loaded: true, isLoggedIn: false });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("name"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
