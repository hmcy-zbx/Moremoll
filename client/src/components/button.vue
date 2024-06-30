<template>
  <button
    class="tan-button"
    :style="{ width, height, 'font-size': fontSize }"
    :type="nativeType"
    :class="[{ 'tan-button-primary': primary }, { 'tan-button-gray': gray }]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "TanButton",
  props: {
    nativeType: {
      type: String,
      default: "button"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "38px"
    },
    fontSize: {
      type: String,
      default: "14px"
    },
    primary: Boolean,
    gray: Boolean,
    return: Boolean
  }
};
</script>

<style>
.tan-button {
  display: inline-flex;
  padding: 0;
  margin: 0;
  border: 1px solid #b0b0b0;
  color: #b0b0b0;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.tan-button-primary {
  color: #fff;
  border-color: #ff6700;
  background-color: #ff6700;
}

.tan-button-primary:hover {
  background-color: #f25807;
  border-color: #f25807;
  color: #fff;
}

.tan-button.tan-button-gray {
  background: #b0b0b0;
  border-color: #b0b0b0;
  color: #fff;
}

.tan-button.tan-button-gray:hover {
  background-color: #757575;
  border-color: #757575;
  color: #fff;
}
</style>
