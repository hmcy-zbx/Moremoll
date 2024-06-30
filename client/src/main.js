import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import checkbox from "@/components/checkbox";
import number_input from "./components/input-number";
import button from "@/components/button";
import page_header from "@/components/page-header";
import message from "@/components/message";

// bug，会覆盖掉上一个
const messageFunction = (msg, type, duration = 1500) => {
  const MessageConstructor = Vue.extend(message);
  const instance = new MessageConstructor();
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  instance.message = msg;
  instance.type = type;
  instance.visible = true;

  setTimeout(() => {
    instance.visible = false;

    setTimeout(() => {
      document.body.removeChild(instance.$el);
      instance.$destroy();
    }, 300);
  }, duration);
};

const Message = {
  install(Vue) {
    Vue.prototype.$success = (msg, duration = 1500) => {
      messageFunction(msg, "success", duration);
    };
    Vue.prototype.$error = (msg, duration = 1500) => {
      messageFunction(msg, "error", duration);
    };
    Vue.prototype.$warning = (msg, duration = 1500) => {
      messageFunction(msg, "warning", duration);
    };
  }
};

Vue.config.productionTip = false;

Vue.component("tan-checkbox", checkbox);
Vue.component("tan-input-number", number_input);
Vue.component("tan-button", button);
Vue.component("tan-page-header", page_header);

Vue.use(Message);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
