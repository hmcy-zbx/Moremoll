import axios from "./axios";

const register = ({ username, password, email }) => {
  return axios.request({
    url: "/user/register",
    method: "post",
    data: { username, password, email }
  });
};

const login = ({ username, password }) => {
  return axios.request({
    url: "/user/login",
    method: "post",
    data: { username, password }
  });
};

const userProfile = () => {
  return axios.request({
    url: "/user/profile"
  });
};

export default {
  register,
  login,
  userProfile
};
