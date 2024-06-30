<template>
  <div id="app">
    <tan-site-header></tan-site-header>
    <transition name="app-fade">
      <router-view />
    </transition>
    <tan-site-footer></tan-site-footer>
  </div>
</template>

<script>
import siteHeader from "@/components/site-header";
import siteFooter from "@/components/site-footer";

export default {
  name: "App",
  components: { "tan-site-header": siteHeader, "tan-site-footer": siteFooter }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.app-fade-enter-active {
  transition: all 0.3s ease;
}

.app-fade-leave-active {
  transition: all 0.3s ease;
}

.app-fade-enter,
.app-fade-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}

body {
  background-color: #f5f5f5;
}

ul {
  list-style: none;
}

.container {
  width: 1226px;
  margin: 0 auto;
}

.line {
  margin-top: 12px;
  border-bottom: 1px solid #e0e0e0;
}

em,
i {
  font-style: normal;
}

a {
  text-decoration-line: none;
}

input {
  outline: none;
}
</style>
