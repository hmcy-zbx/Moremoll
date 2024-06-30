import axios from "./axios";

const list = () => {
  return axios.request({
    url: "/category/list"
  });
};

export default {
  list
};
