<template>
  <div class="order-list">
    <div class="header">
      <h1 class="title">我的订单</h1>
      <div class="more">
        <ul class="filter-list">
          <li class="item" :class="{ active: type == 0 }" @click="type = 0">
            全部订单
          </li>
          <li class="item" :class="{ active: type == 1 }" @click="type = 1">
            已支付
          </li>
          <li class="item" :class="{ active: type == 2 }" @click="type = 2">
            未支付
          </li>
        </ul>
        <div class="search">
          <input type="text" />
          <button type="button">&#128269;</button>
        </div>
      </div>
    </div>
    <div class="body">
      <ul class="list">
        <li v-for="order in orders" class="item" :key="order.id">
          <div class="header">
            <span class="status">{{ order.paid ? "已支付" : "未支付" }}</span>
            <div class="info">
              <span class="time">{{ order.createTime }}</span>
              <span class="name">{{ order.contact.name }}</span>
              <span class="order-id"
                >订单号：<i>{{ order.id }}</i></span
              >
              <span class="price">
                实付金额：
                <em>{{ order.price }}</em>
                元
              </span>
            </div>
          </div>
          <ul class="list">
            <li v-for="detail in order.details" :key="detail.id" class="item">
              <div v-if="detail.product">
                <div class="img">
                  <img :src="detail.product.details.image" alt="" />
                </div>
                <div class="info">
                  <router-link
                    class="name"
                    :to="{
                      name: 'productDetail',
                      params: { id: detail.productId }
                    }"
                  >
                    {{
                      detail.product.name + " " + detail.product.details.name
                    }}
                  </router-link>
                  <span class="quantity">{{
                    detail.product.details.salePrice + " * " + detail.quantity
                  }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderHttp from "@/api/order";
import productHttp from "@/api/product";

export default {
  name: "OrderList",
  data() {
    return {
      // 全部的订单信息，默认不显示
      orders: [],
      allOrders: [],
      type: 0
    };
  },
  watch: {
    type(value) {
      switch (value) {
        case 0:
          this.orders = this.allOrders;
          break;
        case 1:
          this.orders = this.allOrders.filter(e => e.paid);
          break;
        case 2:
          this.orders = this.allOrders.filter(e => !e.paid);
          break;
      }
    }
  },
  mounted() {
    orderHttp.list().then(res => {
      if (res.code == 200) {
        // 默认显示全部
        this.allOrders = res.data;
        this.allOrders.forEach(e => {
          e.details.forEach(d => {
            productHttp.getById(d.productId, d.detailId).then(res => {
              if (res.code == 200) this.$set(d, "product", res.data);
            });
          });
        });
        this.orders = this.allOrders;
      } else this.$warning(res.message);
    });
  }
};
</script>

<style>
.order-list {
  width: 978px;
  margin: 40px auto;
  background-color: #fff;
  padding: 20px 48px;
}

.order-list > .header > .title {
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.order-list > .header > .more {
  display: flex;
  position: relative;
}

.order-list > .header > .more > .filter-list {
  padding: 18px 0;
  font-size: 16px;
  line-height: 1.25;
  display: flex;
}

.order-list > .header > .more > .filter-list > .item {
  font-size: 16px;
  padding: 0 20px;
  border-left: 1px solid #e0e0e0;
  color: #757575;
  cursor: pointer;
  transition: all 0.3s;
}

.order-list > .header > .more > .filter-list > .item:first-child {
  border-left: none;
  padding-left: 0;
}

.order-list > .header > .more > .filter-list > .item:hover,
.order-list > .header > .more > .filter-list > .item.active {
  color: #ff6700;
}

.order-list > .header > .more > .search {
  position: absolute;
  right: 0;
  display: flex;
}

.order-list > .header > .more > .search > input {
  outline: none;
  color: #757575;
  width: 189px;
  height: 40px;
  padding: 0 15px;
  font-size: 12px;
  line-height: 40px;
  color: #757575;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.order-list > .header > .more > .search > button {
  border: 1px solid #e0e0e0;
  width: 42px;
  height: 42px;
  line-height: 42px;
  margin-left: -1px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #fff;
}

.order-list > .header > .more > .search:hover > input,
.order-list > .header > .more > .search:hover > button {
  border-color: #b0b0b0;
}

.order-list > .header > .more > .search > input:focus,
.order-list > .header > .more > .search > input:focus + button {
  border-color: #ff6700;
}

.order-list > .body > .list > .item {
  border: 1px solid #b0b0b0;
  margin-bottom: 20px;
}

.order-list > .body > .list > .item > .header {
  padding: 25px 30px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.order-list > .body > .list > .item > .header > .status {
  color: #b0b0b0;
  font-size: 18px;
}

.order-list > .body > .list > .item > .header > .info {
  color: #757575;
  margin-top: 14px;
  position: relative;
}

.order-list > .body > .list > .item > .header > .info > .time,
.order-list > .body > .list > .item > .header > .info > .name,
.order-list > .body > .list > .item > .header > .info > .order-id {
  border-right: 1px solid #e0e0e0;
  padding: 0 8px;
}

.order-list > .body > .list > .item > .header > .info > .order-id {
  border-right: none;
}

.order-list > .body > .list > .item > .header > .info > .time {
  padding-left: 0;
}

.order-list > .body > .list > .item > .header > .info > .price {
  position: absolute;
  right: 0;
  bottom: 0;
}

.order-list > .body > .list > .item > .header > .info > .price > em {
  margin-right: 5px;
  font-size: 28px;
  color: #333;
}

.order-list > .body > .list > .item > .list > .item > div {
  padding: 20px 30px;
  display: flex;
}

.order-list > .body > .list > .item > .list > .item > div > .img > img {
  width: 80px;
  height: 80px;
}

.order-list > .body > .list > .item > .list > .item > div > .info {
  padding: 12px;
}

.order-list > .body > .list > .item > .list > .item > div > .info > .name,
.order-list > .body > .list > .item > .list > .item > div > .info > .quantity {
  display: block;
}

.order-list > .body > .list > .item > .list > .item > div > .info > .name {
  cursor: pointer;
  color: #333;
  transition: all 0.3s;
}

.order-list
  > .body
  > .list
  > .item
  > .list
  > .item
  > div
  > .info
  > .name:hover {
  color: #ff6700;
}

.order-list > .body > .list > .item > .list > .item > div > .info > .quantity {
  margin-top: 8px;
}
</style>
