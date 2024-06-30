import axios from "./axios";

const addCart = ({ quantity, productId, detailId, userId }) => {
  return axios.request({
    url: "/cart/add",
    method: "post",
    data: { quantity, productId, detailId, userId }
  });
};

const list = checked => {
  return axios.request({
    url: "/cart/list",
    params: { checked }
  });
};

const deleteById = id => {
  return axios.request({
    url: "/cart/delete",
    method: "post",
    data: { id }
  });
};

/**
 *
 * @param checked 选中或未选中
 * @param cartId 购物车id，若空则更改全部
 * @returns
 */
const changeChecked = (checked, cartId = null) => {
  return axios.request({
    url: "/cart/checked",
    method: "post",
    data: { checked, cartId }
  });
};

const changeQuantity = (cartId, quantity) => {
  return axios.request({
    url: "/cart/quantity",
    method: "post",
    data: { quantity, cartId }
  });
};

export default {
  addCart,
  list,
  deleteById,
  changeChecked,
  changeQuantity
};
