<template>
  <div class="tan-input" ref="tanInput">
    <label class="tan-input-label" @click="$refs.tanInputText.focus()">{{
      label
    }}</label>
    <input
      class="tan-input-text"
      ref="tanInputText"
      :type="nativeType"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @focus="$refs.tanInput.classList.add('focus', 'active')"
      @blur="$refs.tanInput.classList.remove('focus', value ? '.' : 'active')"
    />
  </div>
</template>

<script>
export default {
  name: "TanInput",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    label: String,
    placeholder: String,
    nativeType: {
      type: String,
      default: "text"
    }
  }
};
</script>

<style>
.tan-input {
  position: relative;
}

.tan-input-text {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  line-height: 18px;
  background: #fff;
  transition: all 0.3s;
}

.tan-input-text:hover {
  border-color: #b0b0b0;
}

.tan-input-label {
  position: absolute;
  left: 12px;
  top: 11px;
  padding: 0 3px;
  color: #b0b0b0;
  cursor: text;
  transition: all 0.3s;
}

.tan-input.active > .tan-input-label {
  top: -8px;
  font-size: 12px;
  background-color: #fff;
}

.tan-input.focus > .tan-input-label {
  color: #ff6700;
}

.tan-input.focus > .tan-input-text {
  border-color: #ff6700;
}
</style>
