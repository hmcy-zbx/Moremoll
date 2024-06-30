<template>
  <div>
    <tan-page-header>我的购物车</tan-page-header>
    <div class="container">
      <div v-if="carts.length" class="cart">
        <div class="list">
          <div class="head">
            <div class="check">
              <tan-checkbox v-model="checkAll">全选</tan-checkbox>
            </div>
            <div class="img">&nbsp;</div>
            <div class="name">商品名称</div>
            <div class="price">单价</div>
            <div class="num">数量</div>
            <div class="total">小计</div>
            <div class="action">操作</div>
          </div>
          <ul class="body">
            <li v-for="cart in carts" class="item" :key="cart.id">
              <div class="check">
                <tan-checkbox
                  v-model="cart.checked"
                  @change="changeChecked(cart.id, cart.checked)"
                  >&nbsp;</tan-checkbox
                >
              </div>
              <div class="img">
                <img
                  :src="cart.detail.image"
                  :alt="cart.product.name + ' ' + cart.detail.name"
                />
              </div>
              <div class="name">
                <router-link
                  :to="{
                    name: 'productDetail',
                    params: { id: cart.product.id }
                  }"
                >
                  <h3 :title="cart.product.name + ' ' + cart.detail.name">
                    {{ cart.product.name + " " + cart.detail.name }}
                  </h3>
                </router-link>
              </div>
              <div class="price">{{ cart.detail.salePrice }} 元</div>
              <div class="num">
                <tan-input-number
                  v-model="cart.quantity"
                  :min="1"
                  @change="changeQuantity(cart)"
                ></tan-input-number>
              </div>
              <div class="total">
                {{ (cart.quantity * cart.detail.salePrice).toFixed(2) }} 元
              </div>
              <div class="action">
                <span @click="remove(cart.id)">×</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="footer">
          <span class="total">
            共
            <i>{{ carts.length }}</i>
            件商品，已选择
            <i>{{ checkedCount }}</i>
            件
          </span>
          <span class="total-price">
            合计：
            <em>{{ totalPrice }}</em>
            元
            <tan-button
              primary
              font-size="18px"
              height="48px"
              width="200px"
              @click="buy"
              >去结算</tan-button
            >
          </span>
        </div>
      </div>
      <div v-else class="empty">
        <h2>您的购物车还是空的！</h2>
        <tan-button
          primary
          width="170px"
          height="48px"
          @click="$router.push({ name: 'index' })"
          >马上去购物</tan-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cartHttp from "@/api/cart";

export default {
  name: "Cart",
  data() {
    return {
      carts: []
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPrice() {
      let total = 0;
      this.carts.forEach(e => {
        total += e.quantity * e.detail.salePrice * e.checked;
      });
      return total.toFixed(2);
    },
    checkedCount() {
      let count = 0;
      this.carts.forEach(e => {
        count += e.checked;
      });
      return count;
    },
    checkAll: {
      get() {
        let checkAll = true;
        this.carts.forEach(e => {
          if (!e.checked) {
            checkAll = false;
            return;
          }
        });
        return checkAll;
      },
      set(value) {
        cartHttp.changeChecked(value).then(res => {
          if (res.code == 200) {
            this.carts.forEach(e => {
              e.checked = value;
            });
            this.$success(res.message);
          } else this.$warning(res.message);
        });
      }
    }
  },
  mounted() {
    cartHttp.list().then(res => {
      if (res.code == 200) this.carts = res.data;
      else this.$warning(res.message);
    });
  },
  methods: {
    remove(cartId) {
      cartHttp.deleteById(cartId).then(res => {
        if (res.code == 200) {
          this.$success(res.message);
          let tmp = this.carts.filter(e => e.id != cartId);
          this.carts = tmp;
        } else this.$warning(res.message);
      });
    },
    buy() {
      let checkeds = this.carts.filter(e => e.checked);
      if (!checkeds.length) {
        this.$warning("不能一个都不选哦");
        return;
      }
      /*for ( let tmp of checkeds )
                if ( tmp.quantity <= 0 ) {
                    this.$warning("数量不能小于0")
                    return
                }*/
      this.$router.push({ name: "buy" });
    },
    changeChecked(cartId, checked) {
      cartHttp.changeChecked(checked, cartId).then(res => {
        if (res.code != 200) this.$warning(res.message);
      });
    },
    changeQuantity(cart) {
      cartHttp.changeQuantity(cart.id, cart.quantity).then(res => {
        if (res.code != 200) {
          cart.quantity = res.data;
          this.$warning(res.message);
        }
      });
    }
  }
};
</script>

<style>
.empty {
  text-align: center;
  padding: 100px 0;
}

.empty > h2 {
  color: #b0b0b0;
  font-size: 36px;
}

.empty > button {
  margin: 20px;
}

.cart > .list {
  margin-top: 38px;
  background-color: #fff;
  font-weight: 400;
}

.cart > .list > .head,
.cart > .list > .body > .item {
  display: flex;
  align-items: center;
}

.cart > .list > .head {
  height: 70px;
}

.cart > .list > .body > .item {
  padding: 15px 0;
  border-top: 1px solid #e0e0e0;
}

.cart > .list > .head > .check,
.cart > .list > .body > .item > .check {
  width: 110px;
  margin-left: 24px;
}

.cart > .list > .head > .img,
.cart > .list > .body > .item > .img {
  width: 120px;
}

.cart > .list > .body > .item > .img > img {
  width: 80px;
  height: 80px;
}

.cart > .list > .head > .name,
.cart > .list > .body > .item > .name {
  width: 380px;
}

.cart > .list > .body > .item > .name h3 {
  color: #424242;
  font-size: 18px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: color 0.3s;
}

.cart > .list > .body > .item > .name h3:hover {
  color: #ff6700;
}

.cart > .list > .head > .price,
.cart > .list > .body > .item > .price,
.cart > .list > .head > .num,
.cart > .list > .body > .item > .num,
.cart > .list > .head > .total,
.cart > .list > .body > .item > .total {
  text-align: center;
}

.cart > .list > .head > .price,
.cart > .list > .body > .item > .price {
  width: 158px;
}

.cart > .list > .body > .item > .price {
  font-size: 16px;
}

.cart > .list > .head > .num,
.cart > .list > .body > .item > .num {
  width: 150px;
}

.cart > .list > .head > .total,
.cart > .list > .body > .item > .total {
  width: 200px;
}

.cart > .list > .body > .item > .total {
  color: #ff6700;
  font-size: 16px;
}

.cart > .list > .head > .action,
.cart > .list > .body > .item > .action {
  width: 80px;
}

.cart > .list > .body > .item > .action {
  cursor: pointer;
}

.cart > .list > .body > .item > .action > span {
  display: block;
  font-size: 18px;
  width: 24px;
  height: 24px;
  line-height: 23px;
  text-align: center;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.3s;
}

.cart > .list > .body > .item > .action > span:hover {
  background-color: #ff6700;
  color: #fff;
}

.cart > .footer {
  margin: 20px 0;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
}

.cart > .footer > .total {
  margin-left: 28px;
  color: #757575;
}

.cart > .footer > .total > i {
  font-style: normal;
  color: #ff6700;
}

.cart > .footer > .total-price {
  position: absolute;
  right: 0;
  color: #ff6700;
}

.cart > .footer > .total-price > em {
  font-size: 30px;
  font-style: normal;
}

.cart > .footer > .total-price > button {
  margin-left: 50px;
}
</style>
