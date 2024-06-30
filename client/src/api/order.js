import axios from "./axios";

const buy = (contactId, products) => {
  let tmp = new Array();
  for (let p of products)
    tmp.push({
      quantity: p.quantity,
      productId: p.productId,
      detailId: p.detailId,
      cartId: p.id
    });
  return axios.request({
    url: "/order/buy",
    method: "post",
    data: { contactId, products: tmp }
  });
};

const pay = id => {
  return axios.request({
    url: "/order/pay",
    method: "post",
    data: { id }
  });
};

const list = () => {
  return axios.request({
    url: "/order/list"
  });
};

export default {
  buy,
  pay,
  list
};
