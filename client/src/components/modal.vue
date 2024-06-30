<template>
  <transition name="tan-modal-fade">
    <div v-show="visible" class="tan-modal-wrapper">
      <div class="tan-modal">
        <div class="tan-modal-header">
          <h2 class="tan-modal-header-title">{{ title }}</h2>
          <button
            type="button"
            class="tan-modal-header-close"
            @click="$emit('close')"
          >
            ×
          </button>
        </div>
        <div class="tan-modal-body">
          <slot></slot>
        </div>
        <div v-if="footer" class="tan-modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TanModal",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    visible: Boolean,
    footer: Boolean
  }
};
</script>

<style>
.tan-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.tan-modal {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tan-modal-header {
  height: 32px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background-color: #f5f5f5;
}

.tan-modal-header-title,
.tan-modal-header-close {
  font-weight: 400;
  font-size: 18px;
  color: #424242;
}

.tan-modal-header-close {
  color: #757575;
  width: 30px;
  height: 30px;
  line-height: 31px;
  text-align: center;
  border-radius: 50%;
  font-size: 28px;
  transition: all 0.3s;
  outline: none;
  border: none;
  background-color: #f5f5f5;
}

.tan-modal-header-close:hover {
  background-color: #e53935;
  color: #fff;
  cursor: pointer;
}

.tan-modal-body {
  padding: 20px;
}

.tan-modal-fade-enter-active {
  transition: all 0.3s ease;
}

.tan-modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.tan-modal-fade-enter,
.tan-modal-fade-leave-to {
  transform: translateY(-100vh);
  opacity: 0;
}

.tan-modal-footer {
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
