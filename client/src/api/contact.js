import axios from "./axios";

const list = () => {
  return axios.request({
    url: "/contact/list"
  });
};

export default {
  list
};
