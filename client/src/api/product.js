import axios from "./axios";

const list = () => {
  return axios.request({
    url: "/product/list"
  });
};

const getById = (id, detailId) => {
  return axios.request({
    url: `/product/content/${id}`,
    params: { detailId }
  });
};

const listByCategoryId = id => {
  return axios.request({
    url: "/product/list",
    params: { categoryId: id }
  });
};

export default {
  list,
  getById,
  listByCategoryId
};
