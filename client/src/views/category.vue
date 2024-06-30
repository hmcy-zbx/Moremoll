<template>
  <tan-product-list
    class="container"
    :products="products"
    :title="$route.params.name"
  ></tan-product-list>
</template>

<script>
import productList from "@/components/product-list";
import productHttp from "@/api/product";

export default {
  name: "Category",
  components: { "tan-product-list": productList },
  data() {
    return {
      products: []
    };
  },
  watch: {
    $route(value) {
      this.loadProducts(value.params.id);
    }
  },
  mounted() {
    this.loadProducts(this.$route.params.id);
  },
  methods: {
    loadProducts(id) {
      productHttp.listByCategoryId(id).then(res => {
        this.products = res.data;
      });
    }
  }
};
</script>
