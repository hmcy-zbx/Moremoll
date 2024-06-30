<template>
  <div>
    <div class="tan-page-header" ref="top">
      <div class="container">
        <h2>
          <slot></slot>
        </h2>
      </div>
    </div>
    <div class="tan-page-header-fixed" :class="{ active: top }">
      <div class="container">
        <h2>
          <slot></slot>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TanPageHeader",
  data() {
    return {
      top: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent, false);
  },
  methods: {
    scrollEvent() {
      // 滚动条偏移量
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 要滚动到顶部吸附的元素的偏移量
      let offsetTop = this.$refs.top.offsetTop;
      this.top = scrollTop > offsetTop + 63 ? true : false;
    }
  }
};
</script>

<style>
.tan-page-header,
.tan-page-header-fixed {
  height: 63px;
  color: #616161;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 5px 5px rgb(0 0 0 / 7%);
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 999;
}

.tan-page-header h2,
.tan-page-header-fixed h2 {
  color: #424242;
  font-size: 18px;
  font-weight: 400;
  line-height: 60px;
}

.tan-page-header-fixed {
  position: fixed;
  top: 0;
  transition: all 0.3s;
  height: 0;
  overflow: hidden;
  opacity: 0.9;
}

.tan-page-header-fixed.active {
  height: 63px;
}
</style>
