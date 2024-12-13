import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
pinia.use(piniaPluginPersist);

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
