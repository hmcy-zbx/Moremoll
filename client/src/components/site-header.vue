<template>
  <header class="tan-site-header">
    <div class="tan-site-topbar">
      <div class="container">
        <div class="tan-site-topbar-nav">
          <router-link :to="{ name: 'index' }">MoreMall商城</router-link>
        </div>
        <div v-if="user" class="tan-site-topbar-right">
          <span>{{ user.username }}</span>
          <router-link :to="{ name: 'cart' }">购物车</router-link>
          <router-link :to="{ name: 'orderList' }">订单列表</router-link>
        </div>
        <div v-else class="tan-site-topbar-right">
          <span @click="showModal('login')">登录</span>
          <span @click="showModal('register')">注册</span>
        </div>
      </div>
    </div>
    <div class="tan-header container">
      <div class="tan-header-logo">
        <router-link :to="{ name: 'index' }">
          <img src="../assets/malllogo.png" />
        </router-link>
      </div>
      <ul class="tan-header-nav">
        <li
          v-for="category in productCategory"
          :key="category.id"
          class="tan-header-nav-item"
        >
          <router-link
            :to="{
              name: 'category',
              params: { id: category.id, name: category.name }
            }"
          >
            {{ category.name }}
          </router-link>
        </li>
      </ul>
      <div class="tan-header-search">
        <input class="tan-header-search-input" type="text" />
        <button class="tan-header-search-btn">&#128269;</button>
      </div>
    </div>
    <tan-modal
      footer
      :title="title"
      :visible="modalStatus.visible"
      @close="modalVisible = false"
    >
      <component
        :is="'tan-' + modalStatus.componentName"
        :data="data"
      ></component>
      <template v-slot:footer>
        <tan-button
          primary
          width="160px"
          height="40px"
          @click="handleConfirm"
          >{{ title }}</tan-button
        >
        <tan-button
          gray
          width="160px"
          height="40px"
          @click="modalVisible = false"
          >取消</tan-button
        >
      </template>
    </tan-modal>
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import modal from "@/components/modal";
import login from "@/components/login";
import register from "@/components/register";

import userHttp from "@/api/user";
import categoryHttp from "@/api/category";

export default {
  name: "TanSiteHeader",
  components: {
    "tan-modal": modal,
    "tan-login": login,
    "tan-register": register
  },
  data() {
    return {
      data: {},
      productCategory: []
    };
  },
  computed: {
    ...mapState(["modalStatus", "user"]),
    modalVisible: {
      get() {
        return this.modalStatus.visible;
      },
      set(visible) {
        this.changeModalStatus({ visible });
      }
    },
    title() {
      return this.modalStatus.componentName == "login" ? "登录" : "注册";
    }
  },
  mounted() {
    // 这个组件是公共组件，全局都在用。
    // 所以当这个组件加载后，就获取用户信息，这样如果有cookie的话，就可以从服务端获取到用户信息
    // 以此来达到登录的效果
    this.getUser();
    this.initProductCategory();
  },
  methods: {
    ...mapMutations(["changeModalStatus"]),
    ...mapActions(["getUser"]),
    showModal(componentName) {
      if (componentName != this.modalStatus.componentName) this.data = {};
      this.changeModalStatus({ componentName, visible: true });
    },
    handleConfirm() {
      if (this.modalStatus.componentName == "register") this.register();
      else this.login();
    },
    register() {
      userHttp.register(this.data).then(res => {
        if (res.code != 200) this.$warning(res.message);
        else {
          this.$success(res.message);
          this.modalVisible = false;
        }
      });
    },
    login() {
      userHttp.login(this.data).then(res => {
        if (res.code / 100 != 2) this.$warning(res.message);
        else {
          // 获取用户信息
          this.getUser();
          this.$success(res.message);
          this.modalVisible = false;
        }
      });
    },
    initProductCategory() {
      categoryHttp.list().then(res => {
        if (res.code == 200) {
          this.productCategory = res.data;
        }
      });
    }
  }
};
</script>

<style>
.tan-site-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.tan-site-topbar {
  background-color: #333;
  height: 40px;
}

.tan-site-topbar > .container {
  display: flex;
  justify-content: space-between;
}

.tan-site-topbar a,
.tan-site-topbar span {
  color: #b0b0b0;
  line-height: 40px;
  font-size: 12px;
  cursor: pointer;
  padding: 0 5px;
  transition: all 0.3s;
}

.tan-site-topbar a:hover,
.tan-site-topbar span:hover {
  color: #fff;
}

.tan-header {
  display: flex;
  height: 100px;
  align-self: center;
  position: relative;
}

.tan-header-nav {
  display: flex;
  margin-left: 100px;
}

.tan-header-nav-item {
  padding: 38px 12px;
}

.tan-header-nav-item > a {
  font-size: 16px;
  color: #333;
  text-decoration-line: none;
  transition: color 0.2s;
}

.tan-header-nav-item > a:hover {
  color: #ff6700;
}
.tan-header-logo img {
  height: 50px;
  padding-top: 25px;
}

.tan-header-search {
  display: flex;
  height: 50px;
  margin-top: 26px;
  position: absolute;
  right: 0;
}

.tan-header-search-input,
.tan-header-search-btn {
  height: 48px;
  border: 1px solid #e0e0e0;
  outline: none;
  transition: all 0.3s;
}

.tan-header-search:hover > .tan-header-search-input,
.tan-header-search:hover > .tan-header-search-btn {
  border-color: #b0b0b0;
}

.tan-header-search > .tan-header-search-input:focus,
.tan-header-search > .tan-header-search-input:focus + .tan-header-search-btn {
  border-color: #ff6700;
}

.tan-header-search-input {
  width: 223px;
  padding: 0 10px;
}

.tan-header-search-btn {
  width: 52px;
  height: 50px;
  color: #616161;
  background-color: #fff;
  position: relative;
  left: -1px;
  cursor: pointer;
  font-size: 22px;
}

.tan-modal {
  width: 374px;
}

.tan-modal-body .tan-input:not(:last-child) {
  margin-bottom: 14px;
}

.tan-modal-footer > .tan-button {
  margin: 0 7px;
}
</style>
