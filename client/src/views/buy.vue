<template>
  <div>
    <tan-page-header>确认订单</tan-page-header>
    <div class="buy container">
      <div class="body">
        <div class="address">
          <h3 class="header">收货地址</h3>
          <tan-address-list
            :contacts="contacts"
            :current-id="contactCurrentId"
            @click="contactCurrentId = $event"
          ></tan-address-list>
        </div>
        <div class="products">
          <h3 class="header">商品</h3>
          <ul class="list">
            <li v-for="cart in carts" :key="cart.id" class="item">
              <div class="img">
                <img :src="cart.detail.image" />
              </div>
              <div
                class="name"
                :title="cart.product.name + ' ' + cart.detail.name"
              >
                {{ cart.product.name + " " + cart.detail.name }}
              </div>
              <div class="price-box">
                <span class="price"
                  >{{ cart.detail.salePrice }} × {{ cart.quantity }}</span
                >
                <span class="total"
                  >{{
                    (cart.detail.salePrice * cart.quantity).toFixed(2)
                  }}元</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="total-price">
          <h3 class="header">小计</h3>
          <div class="price">
            <span class="text">应付总额：</span>
            <span class="money">
              <em>{{ totalPrice }}</em>
              元
            </span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div v-if="currentContact" class="address">
          <div class="info">
            {{ currentContact.name + " " + currentContact.telephone }}
          </div>
          <div class="description">{{ currentContact.address }}</div>
        </div>
        <div class="btns">
          <tan-button width="160px" height="40px" @click="$router.go(-1)">
            返回购物车
          </tan-button>
          <tan-button primary width="160px" height="40px" @click="buy">
            立即下单
          </tan-button>
        </div>
      </div>
    </div>
    <tan-modal footer title="确认付款" :visible="visible" @close="closePay">
      <div>
        <h2>立即支付？</h2>
      </div>
      <template v-slot:footer>
        <tan-button primary width="160px" height="40px" @click="pay">
          立即支付
        </tan-button>
        <tan-button gray width="160px" height="40px" @click="closePay">
          取消
        </tan-button>
      </template>
    </tan-modal>
  </div>
</template>

<script>
import addressList from "@/components/address-list";
import contactHttp from "@/api/contact";
import cartHttp from "@/api/cart";
import orderHttp from "@/api/order";
import modal from "@/components/modal";

export default {
  name: "Buy",
  components: { "tan-address-list": addressList, "tan-modal": modal },
  data() {
    return {
      contacts: [],
      contactCurrentId: null,
      visible: false,
      orderId: null,
      carts: new Array()
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.carts.forEach(e => {
        total += e.quantity * e.detail.salePrice * e.checked;
      });
      return total.toFixed(2);
    },
    currentContact() {
      if (!this.contactCurrentId) return null;
      for (let tmp of this.contacts) {
        if (tmp.id == this.contactCurrentId) {
          return tmp;
        }
      }
      return null; // 如果没有找到匹配的联系人，返回null
    }
  },
  mounted() {
    this.getCarts();
    this.getContactList();
  },
  methods: {
    getCarts() {
      cartHttp.list(true).then(res => {
        if (res.code == 200) this.carts = res.data;
        else this.$warning(res.message);
      });
    },
    getContactList() {
      contactHttp.list().then(res => {
        if (res.code == 200) this.contacts = res.data;
        else this.$warning(res.message);
      });
    },
    buy() {
      if (!this.currentContact) {
        this.$warning("请选择联系人");
        return;
      }
      orderHttp.buy(this.contactCurrentId, this.carts).then(res => {
        if (res.code == 200) {
          this.visible = true;
          this.orderId = res.data;
        } else this.$warning(res.message);
      });
    },
    pay() {
      orderHttp.pay(this.orderId).then(res => {
        if (res.code == 200) this.$success(res.message);
        else this.$warning(res.message);
        this.$router.push({ name: "orderList" });
      });
    },
    closePay() {
      this.visible = false;
      this.$router.push({ name: "orderList" });
    }
  }
};
</script>

<style>
.buy {
  margin: 40px auto;
  background-color: #fff;
  padding-top: 30px;
}

.buy > .body {
  padding: 0 24px;
}

.buy > .body .header {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 20px;
}

.buy > .body > .products > .list > .item {
  display: flex;
  padding: 15px 0;
  align-items: center;
}

.buy > .body > .products > .list > .item > .img {
  margin-right: 10px;
}

.buy > .body > .products > .list > .item > .img > img {
  width: 30px;
  height: 30px;
}

.buy > .body > .products > .list > .item > .name {
  width: 650px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  color: #424242;
}

.buy > .body > .products > .list > .item > .price-box > span {
  display: inline-block;
}

.buy > .body > .products > .list > .item > .price-box > .price {
  width: 150px;
  text-align: center;
}

.buy > .body > .products > .list > .item > .price-box > .total {
  width: 290px;
  text-align: right;
  color: #ff6700;
}

.buy > .body > .total-price {
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.buy > .body > .total-price > .header {
  padding: 20px 0;
  margin-bottom: 0;
}

.buy > .body > .total-price > .price {
  padding: 0 48px 10px 0;
}

.buy > .body > .total-price > .price > .money {
  color: #ff6700;
}

.buy > .body > .total-price > .price > .money > em {
  font-size: 30px;
}

.buy > .footer {
  min-height: 40px;
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  display: flex;
  position: relative;
}

.buy > .footer > .address {
  line-height: 20px;
  color: #424242;
}

.buy > .footer > .btns {
  position: absolute;
  right: 48px;
}

.buy > .footer > .btns > button:last-child {
  margin-left: 30px;
}
</style>
