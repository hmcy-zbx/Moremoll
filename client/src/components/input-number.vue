<template>
  <div class="tan-input-number">
    <span
      class="tan-input-number-btn"
      :class="{ disable: minDisable }"
      @click="decrease"
      >-</span
    >
    <input
      type="number"
      class="tan-input-number-value"
      :value="number"
      @change="handleInputChange($event.target.value)"
      ref="input"
    />
    <span
      class="tan-input-number-btn"
      :class="{ disable: maxDisable }"
      @click="increase"
      >+</span
    >
  </div>
</template>

<script>
export default {
  name: "TanInputNumber",
  model: {
    prop: "number",
    event: "change"
  },
  props: {
    number: Number,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  computed: {
    minDisable() {
      return this.number <= this.min;
    },
    maxDisable() {
      return this.number > this.max;
    }
  },
  methods: {
    changeNumber(value) {
      if (value < this.min) {
        value = this.min;
        this.$refs.input.value = this.min;
      }
      if (value > this.max) {
        value = this.max;
        this.$refs.input.value = this.max;
      }
      this.$emit("change", value);
    },
    handleInputChange(value) {
      const newVal = value === "" ? undefined : Number(value);
      if (newVal) this.changeNumber(newVal);
    },
    decrease() {
      this.changeNumber(this.number - 1);
    },
    increase() {
      this.changeNumber(this.number + 1);
    }
  }
};
</script>

<style>
.tan-input-number {
  height: 38px;
  border: 1px solid #e0e0e0;
  display: inline-flex;
}

.tan-input-number-btn {
  width: 38px;
  height: 38px;
  line-height: 37px;
  font-size: 20px;
  color: #757575;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.tan-input-number-btn:hover {
  background-color: #e0e0e0;
}

.tan-input-number-btn.disable {
  color: #c0c4cc;
  cursor: not-allowed;
}

.tan-input-number-value {
  width: 72px;
  height: 38px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #424242;
  text-align: center;
}

/* 去掉箭头 */
.tan-input-number-value[type="number"]::-webkit-outer-spin-button,
.tan-input-number-value[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
