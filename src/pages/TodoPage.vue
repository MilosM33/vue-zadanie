<template>
  <section class="todo-container">
    <h1 class="title">TODO LIST</h1>
    <h3>Todo count: {{ TodoCount }}</h3>
    <div>
      <router-link to="/removed-todos">Removed todos</router-link>
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
          @deleteTodo="deleteTodo"
        />
      </div>
    </div>

    <div>
      <TodoInput @addTodo="addTodo"></TodoInput>
      <button class="btn btn-get" @click="getTodos">Get data</button>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import TodoInput from "../components/TodoInput.vue";
import axios from "axios";

export default {
  components: { TodoItem, TodoInput },
  name: "App",

  computed: {
    todos() {
      return this.$store.getters.FiltredTodos;
    },

    TodoCount() {
      return this.$store.getters.TodoCount;
    },
  },
  mounted() {
    this.getTodos();
  },

  methods: {
    addTodo(todo) {
      this.$store.commit("addTodo", todo);

      axios.post("https://641efc96ad55ae01ccb403b9.mockapi.io/todos", todo);
    },
    changeTodoStatus(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);
      const completed = e.target.checked;
      this.$store.commit("changeTodoStatus", {
        id,
        completed,
      });

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        completed,
      });
    },
    renameTodo(e) {
      const id = e.target.id;
      const title = e.target.value;
      this.$store.commit("renameTodo", { id, title });

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        title,
      });
    },

    deleteTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);
      const state = !todo.deleted;

      this.$store.commit("deleteTodo", { id, state });

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        deleted: state,
      });
    },

    getTodos() {
      axios
        .get("https://641efc96ad55ae01ccb403b9.mockapi.io/todos")
        .then((res) => {
          this.$store.commit("setTodos", res.data);
        });
    },
  },
};
</script>
