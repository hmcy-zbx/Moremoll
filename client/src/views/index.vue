<template>
  <div>
    <div style="background-color: #fff; padding: 8px 0;">
      <div class="container">
        <tan-swiper width="100%" height="460px" :images="images"></tan-swiper>
      </div>
    </div>
    <!-- 全部商品 -->
    <tan-product-list class="container" :products="products"></tan-product-list>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
import productList from "@/components/product-list";
import productHttp from "@/api/product";

export default {
  name: "Index",
  components: { "tan-swiper": swiper, "tan-product-list": productList },
  data() {
    return {
      images: [
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ed3db75d62d66994c219e5df3f7c648d.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ebff5f5c1f52f2dbdd611897adbefd4.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1acdc8c5e49afede6d6b75ed32568b22.jpg?w=2452&h=920",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ef4160c861b998239bce9adb82341e7.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ed12ea68287caf5fa7807449f9a4f5b7.jpg?thumb=1&w=1226&h=460&f=webp&q=90"
      ],
      products: []
    };
  },
  mounted() {
    productHttp.list().then(res => {
      this.products = res.data;
    });
  }
};
</script>
