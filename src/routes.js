import TodoPage from "./pages/TodoPage.vue";
import RemovedPage from "./pages/RemovedPage.vue";
import TodoDetailPage from "./pages/TodoDetailPage.vue";

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

  {
    path: "/edit-todo/:id",
    component: TodoDetailPage,
    name: "Detail page",
  },
];
