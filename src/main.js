import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import store from "./store/index.js";

import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).use(store).mount("#app");
