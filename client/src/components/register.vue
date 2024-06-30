<template>
  <div class="tan-register">
    <tan-input v-model="data.username" label="用户名"></tan-input>
    <tan-input
      v-model="data.password"
      native-type="password"
      label="密码"
    ></tan-input>
    <tan-input
      v-model="data.email"
      native-type="email"
      label="邮箱地址"
    ></tan-input>
  </div>
</template>

<script>
import input from "@/components/input";

export default {
  name: "TanRegister",
  components: { "tan-input": input },
  props: {
    data: Object
  }
};
</script>
