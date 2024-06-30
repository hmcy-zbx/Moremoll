<template>
  <div class="tan-product-list">
    <div class="tan-product-list-header">
      <h2 class="tan-product-list-header-title">{{ title }}</h2>
      <div class="tan-product-list-header-more">
        <a href="#" class="tan-product-list-header-more-link"></a>
      </div>
    </div>
    <ul v-if="products.length" class="tan-product-list-products">
      <li v-for="p in products" :key="p.id">
        <router-link :to="{ name: 'productDetail', params: { id: p.id } }">
          <img
            class="tan-product-list-products-cover-image"
            :src="p.details[p.showIndex].image"
          />
          <h3 class="tan-product-list-products-title">
            {{ p.name + " " + p.details[p.showIndex].name }}
          </h3>
          <p class="tan-product-list-products-description">
            {{ p.description }}
          </p>
          <p class="tan-product-list-products-price">
            <span>￥{{ p.details[p.showIndex].salePrice }}元</span>
            <del>￥{{ p.details[p.showIndex].price }}元</del>
          </p>
          <ul class="tan-product-list-products-thumb-list">
            <li
              v-for="(d, index) in p.details"
              :key="d.id"
              :class="{ active: p.showIndex == index }"
              @mouseenter="p.showIndex = index"
              @click.prevent=""
            >
              <img :src="d.image" />
            </li>
          </ul>
        </router-link>
      </li>
    </ul>
    <div v-else>
      <h2>空空如也</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "TanProductList",
  props: {
    products: Array,
    title: {
      type: String,
      default: "全部商品"
    }
  }
};
</script>

<style>
.tan-product-list {
  margin: 14px auto;
}

.tan-product-list-header {
  display: flex;
  position: relative;
}

.tan-product-list-header-title,
.tan-product-list-header-more-link {
  height: 58px;
  line-height: 58px;
  color: #333;
}

.tan-product-list-header-title {
  font-size: 22px;
  font-weight: 200;
}

.tan-product-list-header-more {
  position: absolute;
  right: 0;
}

.tan-product-list-header-more-link {
  text-decoration-line: none;
  font-size: 16px;
  transition: all 0.4s;
}

.tan-product-list-header-more-link:hover {
  color: #ff6700;
}

.tan-product-list-products {
  display: flex;
  flex-wrap: wrap;
}

.tan-product-list-products > li {
  width: 296px;
  height: 383px;
  padding-top: 47px;
  background-color: #fff;
  transition: all 0.3s linear;
  margin-right: 14px;
  margin-bottom: 14px;
}

.tan-product-list-products > li:nth-child(4n + 4) {
  margin-right: 0;
}

.tan-product-list-products > li:hover {
  box-shadow: 0 5px 15px rgb(0 0 0 / 20%);
  transform: translate3d(0, -2px, 0);
}

.tan-product-list-products-cover-image {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
}

.tan-product-list-products-title,
.tan-product-list-products-description,
.tan-product-list-products-price {
  text-align: center;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 auto;
  padding: 3px 20px;
}

.tan-product-list-products-title {
  width: 230px;
  font-size: 14px;
  font-weight: 400;
}

.tan-product-list-products-description {
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
}

.tan-product-list-products-price {
  color: #ff6700;
  margin-bottom: 15px;
}

.tan-product-list-products-price > del {
  margin-left: 4px;
  color: #b0b0b0;
}

.tan-product-list-products-thumb-list {
  width: 100%;
  height: 37px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.tan-product-list-products-thumb-list > li {
  width: 34px;
  height: 34px;
  margin: 0 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: border-color 0.2s linear;
}

.tan-product-list-products-thumb-list > li:hover,
.tan-product-list-products-thumb-list > li.active {
  border: 1px solid #ff6700;
}

.tan-product-list-products-thumb-list > li > img {
  width: 34px;
  height: 34px;
}
</style>
