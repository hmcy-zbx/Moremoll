<template>
  <div v-if="product">
    <tan-page-header>{{ product.name }}</tan-page-header>
    <div class="product-detail">
      <div class="body container">
        <div class="image-left">
          <tan-swiper
            width="560px"
            height="560px"
            :images="swiperImages"
          ></tan-swiper>
        </div>
        <div class="info">
          <h2>{{ product.name }}</h2>
          <p class="description">{{ product.description }}</p>
          <p class="price">
            {{ product.details[product.showIndex].salePrice }} 起
          </p>
          <div class="line"></div>
          <div class="option">
            <h2 class="title">选择规格</h2>
            <ul class="list">
              <li
                v-for="(detail, index) in product.details"
                class="item"
                :class="{ active: product.showIndex == index }"
                :key="detail.id"
                @click="product.showIndex = index"
              >
                {{ detail.name }}
              </li>
            </ul>
          </div>
          <div class="number">
            <h2 class="title">购买数量</h2>
            <tan-input-number v-model="number" :min="1"></tan-input-number>
          </div>
          <div class="btns">
            <tan-button
              primary
              width="298px"
              height="52px"
              font-size="16px"
              @click="buy"
              >立即购买</tan-button
            >
            <tan-button
              gray
              width="140px"
              height="52px"
              font-size="16px"
              @click="addCart"
              >加入购物车</tan-button
            >
          </div>
        </div>
      </div>
    </div>
    <tan-product-list
      class="container"
      :products="products"
      :title="product.category[0].name"
    ></tan-product-list>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
import productList from "@/components/product-list";
import productHttp from "@/api/product";
import cartHttp from "@/api/cart";
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProductDetail",
  components: { "tan-swiper": swiper, "tan-product-list": productList },
  data() {
    return {
      number: 1,
      swiperImages: [],
      product: null,
      products: []
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    $route(newValue) {
      this.loadProductContentById(newValue.params.id);
    }
  },
  mounted() {
    this.loadProductContentById(this.$route.params.id);
  },
  methods: {
    ...mapMutations(["setCarts"]),
    loadProductContentById(id) {
      if (!id || !/\d+/.test(id)) {
        this.$error("商品id错误");
        return;
      }
      productHttp.getById(id).then(res => {
        if (res.code != 200) {
          this.$warning(res.message);
          return;
        }
        this.product = res.data;
        this.swiperImages.length = 0;
        this.product.details.forEach(e => {
          this.swiperImages.push(e.image);
        });
        //  如果相似商品没有加载
        if (!this.products.length)
          this.loadProductCategoryById(this.product.categoryId);
      });
    },
    loadProductCategoryById(id) {
      productHttp.listByCategoryId(id).then(resp => {
        this.products = resp.data;
      });
    },
    buy() {
      if (!this.check()) return;
      let data = {
        quantity: this.number,
        productId: this.product.id,
        detailId: this.product.details[this.product.showIndex].id,
        userId: this.user.id
      };
      cartHttp.addCart(data).then(res => {
        if (res.code == 200)
          // 直接跳转到订单确认页面
          // 会给购物车中选中的商品一起结算掉
          this.$router.push({ name: "buy" });
        else this.$warning(res.message);
      });
    },
    addCart() {
      if (!this.check()) return;
      let data = {
        quantity: this.number,
        productId: this.product.id,
        detailId: this.product.details[this.product.showIndex].id,
        userId: this.user.id
      };
      cartHttp.addCart(data).then(res => {
        if (res.code == 200) this.$success(res.message);
        else this.$warning(res.message);
      });
    },
    check() {
      if (!this.user) {
        this.$warning("请先登录");
        return;
      }
      if (this.number > this.product.details[this.product.showIndex].stock) {
        this.$warning("库存不足");
        return;
      }
      return true;
    }
  }
};
</script>

<style>
.product-detail {
  background-color: #fff;
}

.product-detail > .body {
  padding-top: 32px;
  display: flex;
}

.product-detail > .body > .image-left {
  width: 606px;
}

.product-detail > .body > .info {
  flex: 1;
  margin-left: 20px;
}

.product-detail > .body > .info > h2 {
  font-size: 24px;
  font-weight: 400;
  color: #212121;
}

.product-detail > .body > .info > .description {
  color: #b0b0b0;
  margin: 0;
  padding: 0;
  padding-top: 8px;
  line-height: 1.5;
  padding: 14px 0;
}

.product-detail > .body > .info > .price {
  color: #ff6700;
  padding: 14px 0;
  font-size: 24px;
}

.product-detail > .body > .info .title {
  font-size: 18px;
  font-weight: 400;
  padding: 14px 0;
}

.product-detail > .body > .info > .option > .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-detail > .body > .info > .option > .list > .item {
  width: 292px;
  color: #757575;
  height: 42px;
  line-height: 42px;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  transition: all 0.3s ease;
}

.product-detail > .body > .info > .option > .list > .item.active,
.product-detail > .body > .info > .option > .list > .item:hover {
  color: #ff6700;
  border-color: #ff6700;
}

.product-detail > .body > .info > .number {
  display: flex;
  align-items: center;
}

.product-detail > .body > .info > .number > .title {
  margin-right: 14px;
}

.product-detail > .body > .info > .btns {
  margin: 20px 0;
}

.product-detail > .body > .info > .btns > button:nth-child(1) {
  margin-right: 10px;
}
</style>
