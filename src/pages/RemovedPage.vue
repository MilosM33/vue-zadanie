<template>
  <section class="todo-container">
    <h1 class="title">Removed Todos</h1>
    <div>
      <router-link to="/">Todo List</router-link>
    </div>

    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id">
        <TodoItem
          :deleted="todo.deleted"
          :text="todo.title"
          :id="todo.id"
          :completed="todo.completed"
          @changeTodoStatus="changeTodoStatus"
          @renameTodo="renameTodo"
          @unDeleteTodo="addTodo"
          v-if="todo.deleted"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import axios from "axios";

export default {
  name: "App",
  components: { TodoItem },
  computed: {
    todos() {
      return this.$store.getters.Todos;
    },
  },
  methods: {
    changeTodoStatus(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.completed = e.target.checked;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        completed: todo.completed,
      });
    },
    renameTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.title = e.target.value;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        title: todo.title,
      });
    },

    addTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.deleted = false;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        deleted: todo.deleted,
      });
    },
  },
  mounted() {
    axios
      .get("https://641efc96ad55ae01ccb403b9.mockapi.io/todos")
      .then((response) => {
        this.$store.commit("setTodos", response.data);
      });
  },
};
</script>
