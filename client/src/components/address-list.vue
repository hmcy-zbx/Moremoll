<template>
  <ul class="tan-contact-list">
    <li
      v-for="contact in contacts"
      :key="contact.id"
      class="tan-contact-list-item"
      :class="{ active: contact.id == currentId }"
      @click="$emit('click', contact.id)"
    >
      <div class="tan-contact-info">
        <div class="tan-contact-info-name">
          {{ contact.name }}
          <span>{{ contact.tag }}</span>
        </div>
        <span class="tan-contact-info-tel">{{ contact.telephone }}</span>
        <span class="tan-contact-info-address">{{ contact.address }}</span>
      </div>
      <div class="tan-contact-action">
        <span>删除</span>
        <span>修改</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TanAddressList",
  props: {
    contacts: Array,
    currentId: Number
  }
};
</script>

<style>
.tan-contact-list {
  display: flex;
  flex-wrap: wrap;
}

.tan-contact-list-item {
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  line-height: 22px;
  color: #757575;
  position: relative;
  transition: all 0.3s;
}

.tan-contact-list-item:not(:nth-child(4n + 4)) {
  margin: 0 17px 20px 0;
}

.tan-contact-list > .tan-contact-list-item.active {
  border-color: #ff6700;
}

.tan-contact-info {
  padding: 15px 24px 0;
}

.tan-contact-info-name {
  font-size: 18px;
  color: #333;
  line-height: 30px;
  margin-bottom: 10px;
  position: relative;
}

.tan-contact-info-name > span {
  position: absolute;
  right: 0;
  color: #b0b0b0;
}

.tan-contact-info-tel,
.tan-contact-info-address {
  display: block;
}

.tan-contact-action {
  position: absolute;
  right: 24px;
  bottom: 10px;
  color: #ff6700;
  opacity: 0;
  transition: all 0.3s;
}

.tan-contact-action > span {
  margin-left: 10px;
}

.tan-contact-list-item:hover {
  border-color: #b0b0b0;
}

.tan-contact-list-item:hover > .tan-contact-action {
  opacity: 1;
}
</style>
