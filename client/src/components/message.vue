<template>
  <transition name="tan-message-fade">
    <div
      v-show="visible"
      class="tan-message"
      :class="[
        { 'tan-message-success': type == 'success' },
        { 'tan-message-info': type == 'info' },
        { 'tan-message-warning': type == 'warning' },
        { 'tan-message-error': type == 'error' }
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "TanMessage",
  props: {
    message: String,
    visible: Boolean,
    type: {
      type: String,
      default: "info"
    }
  }
};
</script>

<style>
.tan-message {
  width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: calc(50% - 380px / 2);
  top: 20px;
  z-index: 1001;
  /* transform: translateX(-50%); */
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.3s, top 0.3s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}

.tan-message-info {
  color: #909399;
}

.tan-message-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.tan-message-warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.tan-message-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.tan-message-fade-enter-active {
  transition: all 0.3s ease;
}

.tan-message-fade-leave-active {
  transition: all 0.3s ease;
}

.tan-message-fade-enter,
.tan-message-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
