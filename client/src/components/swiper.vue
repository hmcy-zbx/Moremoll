<template>
  <div class="tan-swiper-wrapper" :style="{ width: width, height: height }">
    <div class="tan-swiper-image-list">
      <img
        v-for="(image, index) in images"
        class="tan-swiper-image-list-item"
        :key="image"
        :class="{ active: index == current }"
        :src="image"
      />
    </div>
    <div class="tan-swiper-btn-list">
      <div
        class="tan-swiper-btn tan-swiper-btn-pre"
        @click="changeImage(current - 1)"
      ></div>
      <div
        class="tan-swiper-btn tan-swiper-btn-next"
        @click="changeImage(current + 1)"
      ></div>
    </div>
    <div class="tan-swiper-circle-list">
      <div
        v-for="(_, index) in images"
        :key="index"
        class="tan-swiper-circle-list-item"
        :class="{ active: index == current }"
        @click="changeImage(index)"
      >
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TanSwiper",
  props: {
    images: Array,
    width: String,
    height: String
  },
  data() {
    return {
      current: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.changeImage(this.current + 1);
    }, 3000);
  },
  methods: {
    changeImage(index) {
      if (index < 0) index = this.images.length - 1;
      else if (index >= this.images.length) index = 0;
      this.current = index;
    }
  }
};
</script>

<style>
.tan-swiper-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.tan-swiper-image-list,
.tan-swiper-image-list-item {
  width: 100%;
  height: 100%;
}

.tan-swiper-image-list {
  position: relative;
}

.tan-swiper-image-list-item {
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.3s;
}

.tan-swiper-image-list-item.active {
  opacity: 1;
}

.tan-swiper-btn {
  position: absolute;
  top: calc(50% - 34.5px);
  width: 41px;
  height: 69px;
}

.tan-swiper-btn-pre {
  background: url(../assets/icon-slides.png) no-repeat -84px 50%;
  left: 0;
}

.tan-swiper-btn-next {
  background: url(../assets/icon-slides.png) no-repeat -125px 50%;
  right: 0;
}

.tan-swiper-btn-pre:hover {
  background-position: 0 50%;
}

.tan-swiper-btn-next:hover {
  background-position: -42px 50%;
}

.tan-swiper-circle-list {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
}

.tan-swiper-circle-list-item,
.tan-swiper-circle-list-item > span {
  width: 50px;
}

.tan-swiper-circle-list-item {
  padding: calc((40px -3px) / 2) 0;
  margin: 0 4px;
  cursor: pointer;
}

.tan-swiper-circle-list-item > span {
  display: block;
  background: #ccc;
  border-radius: 0;
  border: 0;
  height: 3px;
  transition: all 0.3s;
}

.tan-swiper-circle-list-item:hover > span,
.tan-swiper-circle-list-item.active > span {
  background: #a3a3a3;
}
</style>
