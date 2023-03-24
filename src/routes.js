import TodoPage from "./pages/TodoPage.vue";
import RemovedPage from "./pages/RemovedPage.vue";

export const routes = [
  {
    path: "/",
    component: TodoPage,
    name: "Home",
  },
  {
    path: "/removed-todos",
    component: RemovedPage,
    name: "Removed",
  },
];
