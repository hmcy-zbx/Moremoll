<template>
  <div class="tan-checkbox" :class="{ checked: checked }" @click="chageChecked">
    <span class="tan-checkbox-input">
      <span class="tan-checkbox-inner"></span>
      <input class="tan-checkbox-original" type="checkbox" :checked="checked" />
    </span>
    <span class="tan-checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "TanCheckbox",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean
  },
  methods: {
    chageChecked() {
      this.$emit("change", !this.checked);
    }
  }
};
</script>

<style>
.tan-checkbox {
  display: inline-block;
  color: #606266;
  font-weight: 500;
  cursor: pointer;
}

.tan-checkbox-inner::before {
  display: inline-block;
  content: "\3000";
  width: 18px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #e0e0e0;
  background: #fff;
  text-align: center;
  transition: all 0.3s;
}

.tan-checkbox:hover .tan-checkbox-inner::before {
  content: "\2714";
}

.tan-checkbox-inner {
  position: relative;
}

.tan-checkbox-original {
  width: 0;
  height: 0;
  opacity: 0;
  outline: none;
}

.tan-checkbox-label {
  margin-left: 8px;
  transition: all 0.3s;
}

.tan-checkbox.checked .tan-checkbox-inner::before {
  background-color: #ff6700;
  border-color: #ff6700;
  color: #fff;
  content: "\2714";
}

.tan-checkbox.checked > .tan-checkbox-label {
  color: #ff6700;
}
</style>
