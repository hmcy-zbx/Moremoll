import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import(/* webpackChunkName: "index" */ "@/views/index")
  },
  {
    path: "/product/:id",
    name: "productDetail",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/views/product-detail")
  },
  {
    path: "/category/:id",
    name: "category",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/views/category")
  },
  {
    path: "/cart",
    name: "cart",
    meta: { requiresLogin: true },
    component: () => import(/* webpackChunkName: "cart" */ "@/views/cart")
  },
  {
    path: "/buy",
    name: "buy",
    meta: { requiresLogin: true },
    component: () => import(/* webpackChunkName: "buy" */ "@/views/buy")
  },
  {
    path: "/orderList",
    name: "orderList",
    meta: { requiresLogin: true },
    component: () =>
      import(/* webpackChunkName: "order" */ "@/views/order-list")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin))
    if (!store.state.user) {
      // 先看看cookie能不能匹配到
      Vue.prototype.$warning("先登录叭. 😜");
      next({ name: "index" });
      store.commit("changeModalStatus", {
        componentName: "login",
        visible: true
      });
    }
  next();
});

export default router;
